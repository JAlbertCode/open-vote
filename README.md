# Open-Vote

A privacy-preserving voting dApp built on Midnight.

## Prerequisites

- **Node.js 20 LTS** (via NVM)
  ```bash
  nvm install 20
  nvm use 20
  ```

- **Compact compiler**
  ```bash
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/download/compact-v0.2.0/compact-installer.sh | sh
  ```
  Verify:
  ```bash
  compact --version
  ```

## Installation
```bash
npm install
```

## Compile Contracts

Compile the Compact source file into managed artifacts:
```bash
npm run compile
```

Outputs to:
```bash
contracts/managed/zkVoteV2/
```

## Build

Transpile TypeScript to JavaScript:
```bash
npm run build
```

Build artifacts are written to:
```bash
dist/
```
## Test

Run the contract simulation tests:
```bash
npm run test
```

This executes the test suite located in:
```bash
src/test/
```

You’ll see output verifying circuit logic, question/option creation, and vote submission behavior.

## Start the Proof Server

Before deploying or interacting with the contract, start the proof server in Docker:
```bash
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'
```

This runs the proof server locally on port 6300, which is required for proving and verifying Compact transactions.

## Deploy

Deploy the compiled contract:
```bash
npm run deploy
```

This runs:
```bash
node dist/deploy.js
```

## Command-Line Interface (CLI)

Interact with the deployed contract directly from the terminal:
```bash
npm run cli
```

This runs:
```bash
node dist/cli.js
```