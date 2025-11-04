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

## Deploy

Deploy the compiled contract:
```bash
npm run deploy
```

This runs:
```bash
node dist/deploy.js
```