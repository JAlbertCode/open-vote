import * as readline from "readline/promises";
import { WalletBuilder } from "@midnight-ntwrk/wallet";
import { findDeployedContract } from "@midnight-ntwrk/midnight-js-contracts";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import {
  NetworkId,
  setNetworkId,
  getZswapNetworkId,
  getLedgerNetworkId
} from "@midnight-ntwrk/midnight-js-network-id";
import { createBalancedTx } from "@midnight-ntwrk/midnight-js-types";
import { Transaction } from "@midnight-ntwrk/ledger";
import { Transaction as ZswapTransaction } from "@midnight-ntwrk/zswap";
import { WebSocket } from "ws";
import * as path from "path";
import * as fs from "fs";
import * as Rx from "rxjs";
import * as crypto from "crypto";

// Fix WebSocket for Node.js
// @ts-ignore
globalThis.WebSocket = WebSocket;

// Midnight Testnet
setNetworkId(NetworkId.TestNet);
const TESTNET_CONFIG = {
  indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
  indexerWS: "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
  node: "https://rpc.testnet-02.midnight.network",
  proofServer: "http://127.0.0.1:6300"
};

// ---------- helpers ----------
const encoder = new TextEncoder();

function bytes16(text: string): Uint8Array {
  const src = encoder.encode(text);
  const out = new Uint8Array(16);
  out.set(src.slice(0, 16));
  return out;
}

function toHex(u8: Uint8Array): string {
  return Buffer.from(u8).toString("hex");
}

function generatePollCode(): string {
  // Format: XXXX-XXXX (letters+digits), fits in Bytes<16>
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // avoid ambiguous chars
  const pick = (n: number) =>
    Array.from(crypto.randomBytes(n)).map(b => alphabet[b % alphabet.length]).join("");
  return `${pick(4)}-${pick(4)}`;
}

function printTxInfo(tx: any) {
  
  const pub = tx?.public ?? {};
  const rawHash =
    pub.txHash ?? pub.hash ?? null; 
  const rawId =
    pub.txId ?? null;

  const hashHex =
    rawHash instanceof Uint8Array ? toHex(rawHash) :
    typeof rawHash === "string" ? rawHash :
    rawId instanceof Uint8Array ? toHex(rawId) : // fallback: hash == id bytes
    String(rawId ?? "");

  const idHex =
    rawId instanceof Uint8Array ? toHex(rawId) : String(rawId ?? "");

  console.log(`Block height: ${pub.blockHeight}`);
  console.log(`Transaction hash: ${hashHex}`);
  console.log(`Transaction id:   ${idHex}\n`);
}

// ---------- main ----------
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  process.on("SIGINT", () => {
    console.log("\nInterrupted. Exiting.");
    rl.close();
    process.exit(0);
  });

  console.log("zkVote Contract CLI\n");

  try {
    if (!fs.existsSync("deployment.json")) {
      console.error("No deployment.json found! Run npm run deploy first.");
      process.exit(1);
    }
    const deployment = JSON.parse(fs.readFileSync("deployment.json", "utf-8"));
    console.log(`Contract: ${deployment.contractAddress}\n`);

    const walletSeed = await rl.question("Enter your wallet seed: ");
    console.log("\nConnecting to Midnight Testnet...");

    const wallet = await WalletBuilder.buildFromSeed(
      TESTNET_CONFIG.indexer,
      TESTNET_CONFIG.indexerWS,
      TESTNET_CONFIG.proofServer,
      TESTNET_CONFIG.node,
      walletSeed,
      getZswapNetworkId(),
      "info"
    );
    wallet.start();

    await Rx.firstValueFrom(
      wallet.state().pipe(Rx.filter((s) => s.syncProgress?.synced === true))
    );

    const contractPath = path.join(process.cwd(), "contracts");
    const contractModulePath = path.join(
      contractPath,
      "managed",
      "zkVoteV1",
      "contract",
      "index.cjs"
    );
    const zkVoteV1Module = await import(contractModulePath);
    const contractInstance = new zkVoteV1Module.Contract({}); // no witnesses

    const walletState = await Rx.firstValueFrom(wallet.state());
    const walletProvider = {
      coinPublicKey: walletState.coinPublicKey,
      encryptionPublicKey: walletState.encryptionPublicKey,
      balanceTx(tx: any, newCoins: any) {
        return wallet
          .balanceTransaction(
            ZswapTransaction.deserialize(
              tx.serialize(getLedgerNetworkId()),
              getZswapNetworkId()
            ),
            newCoins
          )
          .then((balanced) => wallet.proveTransaction(balanced))
          .then((zswapTx) =>
            Transaction.deserialize(
              zswapTx.serialize(getZswapNetworkId()),
              getLedgerNetworkId()
            )
          )
          .then(createBalancedTx);
      },
      submitTx(tx: any) {
        return wallet.submitTransaction(tx);
      }
    };

    const zkConfigPath = path.join(contractPath, "managed", "zkVoteV1");
    const providers = {
      privateStateProvider: levelPrivateStateProvider({
        privateStateStoreName: "zkVoteV1-state"
      }),
      publicDataProvider: indexerPublicDataProvider(
        TESTNET_CONFIG.indexer,
        TESTNET_CONFIG.indexerWS
      ),
      zkConfigProvider: new NodeZkConfigProvider(zkConfigPath),
      proofProvider: httpClientProofProvider(TESTNET_CONFIG.proofServer),
      walletProvider,
      midnightProvider: walletProvider
    };

    const deployed: any = await findDeployedContract(providers, {
      contractAddress: deployment.contractAddress,
      contract: contractInstance,
      privateStateId: "zkVoteV1State",
      initialPrivateState: {}
    });

    console.log("Connected to contract\n");

    let running = true;
    while (running) {
      console.log("--- Menu ---");
      console.log("1. Create Poll");
      console.log("2. Exit");

      const choice = await rl.question("\nYour choice: ");

      switch (choice.trim()) {
        case "1": {
          // auto-generate poll code and call createPoll
          const pollCodeHuman = generatePollCode();
          console.log(`\nYour poll code: ${pollCodeHuman}`);
          console.log("Share this code with respondents. (Fits Bytes<16>)");

          try {
            const tx = await deployed.callTx.createPoll(bytes16(pollCodeHuman));
            console.log("Poll created successfully!");
            printTxInfo(tx);
          } catch (err) {
            console.error("Failed to create poll:", err, "\n");
          }
          break;
        }

        case "2":
          running = false;
          console.log("\nGoodbye!");
          break;

        default:
          console.log("Invalid choice. Please enter 1 or 2.\n");
      }
    }

    await wallet.close();
  } catch (error) {
    console.error("\nError:", error);
  } finally {
    process.stdin.pause();
  }
}

main().catch(console.error);
