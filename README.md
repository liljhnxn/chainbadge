# ChainBadge 🛡️

**ChainBadge** is a clean, modern Web3 dApp built on the **Botchain Testnet** that allows users to connect their Web3 wallet and claim an immutable on-chain digital achievement badge: **"Early Achiever"**.

Each wallet address can claim the badge **only once**, with the claimant address and claim timestamp permanently recorded on the blockchain ledger.

---

## 🚀 Tech Stack

- **Smart Contract**: Solidity (`0.8.20`), Hardhat
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Web3 Libraries**: Wagmi v3, Viem v2, TanStack Query
- **Icons & Styling**: Lucide React, Glassmorphic Web3 Dark Mode UI

---

## 🌐 Network Configuration (Botchain Testnet)

- **Network Name**: BOT Chain Testnet
- **Chain ID**: `968` (Hex: `0x3c8`)
- **RPC URL**: `https://rpc.bohr.life`
- **Block Explorer**: `https://scan.bohr.life`
- **Native Currency**: `BOT` (Decimals: 18)

---

## 📦 Project Structure

```text
├── contracts/
│   └── ChainBadge.sol          # Solidity registry smart contract
├── test/
│   └── ChainBadge.test.cjs      # Comprehensive Hardhat test suite (7 tests)
├── scripts/
│   └── deploy.cjs               # Botchain deployment script
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS styles and glassmorphic utilities
│   │   ├── layout.tsx           # Metadata and provider wrappers
│   │   ├── page.tsx             # Single-page dApp layout
│   │   └── providers.tsx        # Wagmi & TanStack Query providers
│   ├── components/
│   │   ├── Header.tsx           # Logo, network badge, wallet connect/disconnect
│   │   ├── Hero.tsx             # Value proposition and headline
│   │   ├── BadgeCard.tsx        # Live on-chain badge claim, status & details
│   │   └── Footer.tsx           # Contract and network metadata footer
│   └── config/
│       ├── chain.ts             # Botchain Testnet chain definition (Viem)
│       ├── contract.ts          # ChainBadge ABI & contract address config
│       └── wagmi.ts             # Wagmi client configuration
├── hardhat.config.cjs           # Hardhat configuration for Botchain Testnet
├── .env.example                 # Environment variables template
└── README.md                    # Project documentation
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18, v20, v22, or higher)
- A Web3 wallet (MetaMask, Rabby, Coinbase Wallet, etc.)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Compile Smart Contracts
Compile the `ChainBadge.sol` smart contract:
```bash
npm run compile
```

### 4. Run Smart Contract Tests
Run the automated Hardhat test suite:
```bash
npm test
```
The test suite verifies:
1. Metadata initialization (`BADGE_NAME`, `BADGE_DESCRIPTION`, and initial total claims).
2. Unclaimed address verification.
3. Wallet claiming the badge successfully.
4. Prevention of duplicate claims by the same address (reverts with `"ChainBadge: Badge already claimed"`).
5. Exact block timestamp recording.
6. Independent badge claiming by multiple wallets.
7. Proper emission of the `BadgeClaimed(address indexed recipient, uint256 timestamp)` event.

---

## ⛓️ Deploying to Botchain Testnet

### Step 1: Set Up Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Open `.env` and configure your deployer wallet private key:
```env
PRIVATE_KEY="your_private_key_here"
BOTCHAIN_RPC_URL="https://rpc.bohr.life"
```
> ⚠️ **Important**: Ensure your deployer account has some testnet `BOT` coins to cover deployment gas. Never share or commit your private key!

### Step 2: Deploy Contract
Run the deployment script targeted at Botchain Testnet:
```bash
npm run deploy:botchain
```

Upon successful deployment, the script outputs:
```text
==========================================
ChainBadge Deployed Successfully!
==========================================
Contract Address : 0x...
Chain ID         : 968
Block Explorer   : https://scan.bohr.life/address/0x...
==========================================
```

### Step 3: Connect Frontend to the Deployed Contract
Create or update `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS="0x_your_deployed_contract_address_here"
NEXT_PUBLIC_BOTCHAIN_RPC_URL="https://rpc.bohr.life"
```

---

## 💻 Running the Frontend Locally

Start the local Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

1. Connect your Web3 wallet (e.g. MetaMask).
2. If your wallet is on another network, click **"Switch to Botchain"**.
3. Click **"Claim Early Achiever Badge"** and approve the transaction.
4. Once mined, your claimant address and timestamp will be displayed, along with a direct link to view the transaction on BohrScan!

---

## 🌐 Deploying to Vercel

ChainBadge is built with Next.js and ready for 1-click deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to **Vercel** and click **"Add New Project"**.
3. Import your repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: The deployed `ChainBadge` contract address on Botchain Testnet.
   - `NEXT_PUBLIC_BOTCHAIN_RPC_URL`: `https://rpc.bohr.life`
5. Click **Deploy**. Vercel will build and host your production dApp.

---

## 🔒 Security & Simplicity Checklist

- ✅ **No Unnecessary Complexity**: Simple registry — no NFTs, no payments, no admin backdoors.
- ✅ **Reentrancy Safe**: State updated before emitting events.
- ✅ **One Claim Per Wallet**: Enforced on-chain via mapping checks.
- ✅ **Zero Hardcoded Secrets**: Secrets and contract addresses are strictly managed via environment variables.
- ✅ **Fully Tested & Verified**: All 7 Hardhat tests passing, Next.js production build verified.
