/**
 * @file zkVoteV1Simulator.ts
 * Simulator for the zkVoteV1 contract (no witnesses; UI supplies Bytes<16> poll code).
 */

import {
    type CircuitContext,
    QueryContext,
    sampleContractAddress,
    constructorContext,
    type CoinPublicKey,
  } from "@midnight-ntwrk/compact-runtime";
  import {
    Contract,
    type Ledger,
    ledger as mkLedger,
  } from "../../contracts/managed/zkVoteV1/contract/index.cjs"; // adjust path if needed
  import { TextEncoder } from "node:util";
  
  export class ZkVoteV1Simulator {
    readonly contract: Contract<{}>;
    private baseContext: CircuitContext<{}>;
    private enc = new TextEncoder();
  
    constructor(ownerName = "Alice") {
      // 👇 pass an empty witnesses object to satisfy the constructor signature
      this.contract = new Contract<{}>({} as any);
  
      const { currentPrivateState, currentContractState, currentZswapLocalState } =
        this.contract.initialState(constructorContext({}, this.createPublicKey(ownerName)));
  
      this.baseContext = {
        currentPrivateState,
        currentZswapLocalState,
        originalState: currentContractState,
        transactionContext: new QueryContext(currentContractState.data, sampleContractAddress()),
      };
    }
  
    // ===== Helpers (return raw Uint8Array, not {bytes}) =====
    private fixedBytes(s: string, len: number): Uint8Array {
      const out = new Uint8Array(len);
      if (s) out.set(this.enc.encode(s).slice(0, len));
      return out;
    }
    public bytes16(s: string): Uint8Array  { return this.fixedBytes(s, 16); }
    public bytes32(s: string): Uint8Array  { return this.fixedBytes(s, 32); }
    public bytes100(s: string): Uint8Array { return this.fixedBytes(s, 100); }
    public bytes250(s: string): Uint8Array { return this.fixedBytes(s, 250); }
  
    public tagNewPoll(): Uint8Array   { return this.bytes32("new poll"); }
    public tagQuestion(): Uint8Array  { return this.bytes32("question"); }
    public tagNewOption(): Uint8Array { return this.bytes32("new option"); }
  
    public createPublicKey(name: string): CoinPublicKey {
      const b = this.enc.encode(name);
      const out: string[] = new Array(32);
      for (let i = 0; i < 32; i++) {
        const v = i < b.length ? b[i] : (name.charCodeAt(i % name.length) + i) & 0xff;
        out[i] = v.toString(16).padStart(2, "0");
      }
      return out.join("") as CoinPublicKey;
    }
  
    public getLedger(): Ledger {
      return mkLedger(this.baseContext.originalState.data);
    }
  
    // ===== Pure circuits =====
  
    /** Field handle (opaque) */
    public pollIdFromCode(roomCode16: Uint8Array) {
      const res = this.contract.circuits.pollKeyFromCode(this.baseContext, this.tagNewPoll(), roomCode16);
      return res.result; // Field (opaque handle from bindings)
    }
  
    public questionIdHash(pollIdHash: any, question: string) {
      const res = this.contract.circuits.generateQuestionIdHashKey(
        this.baseContext, this.tagQuestion(), this.bytes250(question), pollIdHash
      );
      return res.result; // Field
    }
  
    public optionIdHash(questionIdHash: any, option: string) {
      const res = this.contract.circuits.generateOptionIdHashKey(
        this.baseContext, this.tagNewOption(), this.bytes100(option), questionIdHash
      );
      return res.result; // Field
    }
  
    // ===== Impure writes =====
  
    public createPoll(humanCode: string): void {
      const res = this.contract.impureCircuits.createPoll(this.baseContext, this.bytes16(humanCode));
      this.baseContext = res.context;
    }
  
    public createQuestion(pollIdHash: any, question: string): void {
      const res = this.contract.impureCircuits.createQuestion(
        this.baseContext, pollIdHash, this.bytes250(question)
      );
      this.baseContext = res.context;
    }
  
    public createOption(pollIdHash: any, questionIdHash: any, option: string): void {
      const res = this.contract.impureCircuits.createOption(
        this.baseContext, pollIdHash, questionIdHash, this.bytes100(option)
      );
      this.baseContext = res.context;
    }
  
    public submitVote(pollIdHash: any, questionIdHash: any, optionIdHash: any): void {
      const res = this.contract.impureCircuits.submitVote(
        this.baseContext, pollIdHash, questionIdHash, optionIdHash
      );
      this.baseContext = res.context;
    }
  
    // ===== Reads =====
  
    public questionCount(pollIdHash: any): bigint {
      const res = this.contract.circuits.questionCount(this.baseContext, pollIdHash);
      return res.result as unknown as bigint; // Uint<64> -> bigint
    }
  
    // These two return raw Uint8Array (Bytes<…>), not {bytes: ...}
    public questionRead(pollIdHash: any, questionIdHash: any): Uint8Array {
      const res = this.contract.circuits.questionRead(this.baseContext, pollIdHash, questionIdHash);
      return res.result as Uint8Array;
    }
  
    public optionRead(pollIdHash: any, questionIdHash: any, optionIdHash: any): Uint8Array {
      const res = this.contract.circuits.optionRead(this.baseContext, pollIdHash, questionIdHash, optionIdHash);
      return res.result as Uint8Array;
    }
  }
  