# On-Chain Petition Platform

A decentralized petition platform built on **BOT Chain**. Anyone with a crypto wallet can sign a petition, and every signature is recorded permanently on the blockchain — so signatures can never be faked, edited, or deleted.

Built for the BOT Chain Build Week Hackathon.

## What it does

- The **admin** creates petitions (each with a title and description).
- **Anyone** with a wallet can sign a petition — but only **once per petition**. Because your wallet is your identity, nobody can sign twice or fake a signature.
- Signers can leave an optional comment.
- Everyone can see the live signature count and the list of recent signers, read straight from the blockchain.

## How someone uses it

1. Open the website.
2. Click **Connect Wallet** (MetaMask). It automatically switches you to the BOT Chain network.
3. Browse the petitions.
4. Click **Sign Petition** on one you support, optionally add a comment, and confirm the transaction in MetaMask.
5. Your signature is now on the blockchain forever, and the count goes up.

## Smart contract

- **File:** [`PetitionPlatform.sol`](./PetitionPlatform.sol)
- **Network:** BOT Chain Testnet (Chain ID 968)
- **Contract address:** `0xD2568d5566E87a3F0C6255d7aFD7EFf7DF08B9f1`
- **Explorer:** https://scan.bohr.life/

> Note: this is the testnet deployment. The mainnet address will be added here once the final version is deployed.

### Main functions

| Function | Who | What it does |
|---|---|---|
| `createPetition(title, description)` | Admin only | Adds a new petition |
| `sign(petitionId, comment)` | Anyone (once) | Signs a petition |
| `getAllPetitions()` | Anyone | Returns every petition |
| `getPetition(id)` | Anyone | Returns one petition's details |
| `getPetitionCount()` | Anyone | How many petitions exist |
| `getSignatures(id)` | Anyone | Returns a petition's signatures |
| `hasSigned(id, address)` | Anyone | Has this wallet already signed? |

## Tech stack

- **Smart contract:** Solidity, deployed with Remix IDE
- **Blockchain:** BOT Chain (EVM-compatible)
- **Frontend:** React + Vite
- **Wallet / blockchain connection:** ethers.js + MetaMask

## Running the frontend locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`) and connect your wallet.

## Team

Built by two students for BOT Chain Build Week.
