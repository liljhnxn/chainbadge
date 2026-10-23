# ChainBadge — Pitch Deck

**Decentralized Achievement Attestation & Sovereign On-Chain Identity on Botchain**  
*Network: Botchain Mainnet (Chain ID: 677)*  
*Repository: [https://github.com/liljhnxn/chainbadge](https://github.com/liljhnxn/chainbadge)*  
*Verified Contract: [`0x84d6E3ba396939cE921607a15E5e058E29935A59`](https://scan.botchain.ai/address/0x84d6E3ba396939cE921607a15E5e058E29935A59)*  

---

## Slide 1: Title & Mission
### 🛡️ ChainBadge: Sovereign Achievement on Botchain
- **Tagline**: The immutable, lightweight layer for on-chain identity and community achievement.
- **Ecosystem**: Built natively for **Botchain Mainnet** (Chain ID: 677, Total Supply: 150M BOT, EVM-compatible, ultra-low gas).
- **Core Mission**: Providing Web3 communities and protocols with a permanent, tamper-proof credential primitive without the overhead of transferable NFTs or centralized servers.

---

## Slide 2: The Problem
### ⚠️ Why Current Reputation & Badge Systems Fail
1. **Centralized Data Sinks**: Most community badges live in Discord roles, Google Sheets, or Web2 servers (vulnerable to hacks, admin deletion, and data loss).
2. **Transferable NFT Speculation**: When badges are minted as standard ERC-721 tokens, users trade them on secondary marketplaces, completely defeating the purpose of "proof of early adoption".
3. **Gas Inefficiency & IPFS Failures**: Minting heavy NFT contracts costs high gas and relies on broken external image links or slow pinning gateways.

---

## Slide 3: The Solution
### ✨ The ChainBadge Protocol
- **Permanent On-Chain Attestation**: Users claim the **"Early Achiever"** badge directly to the blockchain ledger.
- **Strict Single-Claim Rule**: Smart contract enforces that each wallet can claim only once—eliminating double-claiming and sybil gaming.
- **Zero Centralized Infrastructure**: 100% decentralized. No off-chain databases, no APIs to maintain, no single point of failure.
- **Composability Ready**: Any other smart contract or dApp on Botchain can read a user's badge status with a single O(1) query.

---

## Slide 4: User Journey & Workflow
```
[1. Connect Wallet] ──▶ Injected Web3 (MetaMask, Rabby, Coinbase)
         │
[2. Network Check]  ──▶ Auto-detects Botchain Mainnet (Chain ID: 677)
         │
[3. Instant Query]  ──▶ Direct RPC check: hasClaimed(walletAddress)
         │
[4. Claim Badge]    ──▶ Execute claimBadge() transaction
         │
[5. Immutable Proof]──▶ Block timestamp stamped forever on-chain
         │
[6. Verify & Share] ──▶ Direct link to Botchain explorer transaction
```

---

## Slide 5: Technical Architecture
- **Smart Contract (`ChainBadge.sol`)**:
  - Solidity `0.8.20` with optimizer enabled.
  - Gas-optimized single-slot `ClaimRecord` struct (`bool hasClaimed`, `uint256 timestamp`).
  - Safe event emission `BadgeClaimed(address indexed recipient, uint256 timestamp)`.
- **Frontend dApp**:
  - **Next.js 16** (React 19 & App Router) for optimal load times and SEO.
  - **Wagmi v3 & Viem v2** for reliable Web3 wallet interaction.
  - **TanStack Query v5** for live on-chain state synchronization.
  - **Tailwind CSS** featuring a modern dark-mode glassmorphic interface.

---

## Slide 6: Verified Deployment & Live Metrics
- **Network**: Botchain Mainnet (`Chain ID: 677`, `0x2a5`)
- **RPC**: `https://rpc.botchain.ai`
- **Explorer**: `https://scan.botchain.ai`
- **Native Token**: `BOT` (Total Supply: 150 Million)
- **Deployed Address**: [`0x84d6E3ba396939cE921607a15E5e058E29935A59`](https://scan.botchain.ai/address/0x84d6E3ba396939cE921607a15E5e058E29935A59)
- **Status**: Live on Mainnet, tested, and actively receiving badge claims.

---

## Slide 7: Security & Reliability
- **Automated Hardhat Suite**: 7 comprehensive tests covering all functional requirements:
  - Initial metadata validation.
  - One-claim restriction per address.
  - Zero-address protection.
  - Block timestamp accuracy.
  - Independent multi-wallet execution.
  - Correct event indexing.
- **Zero Backdoors**: No admin keys, no owner drain functions, and no upgradability risks.

---

## Slide 8: Real-World Use Cases & Integrations
1. **Botchain Ecosystem Gating**: Whitelist early adopters for future mainnet launches and token distributions.
2. **DAO Governance**: Weight voting proposals based on provable community seniority.
3. **Discord & Community Roles**: Automate verified role granting via Web3 bots (Collab.Land, Guild.xyz).
4. **Developer Primitives**: Open SDK for other Botchain protocols to issue their own customized sub-badges.

---

## Slide 9: Roadmap & Next Milestones
- **Phase 1 (Completed)**: Smart contract deployed, tested, and verified on Botchain Mainnet with production Next.js frontend.
- **Phase 2 (Q4 2026)**: Guild.xyz integration, community dashboard showing total verified pioneers, and ecosystem partnerships.
- **Phase 3 (2027)**: Implementation of ERC-5192 (Soulbound Token standard) and multi-tier achievement categories (Trading, Staking, Governance).

---

## Slide 10: Team, Resources & Links
- **GitHub Repository**: [https://github.com/liljhnxn/chainbadge](https://github.com/liljhnxn/chainbadge)
- **Smart Contract Code**: [ChainBadge.sol on GitHub](https://github.com/liljhnxn/chainbadge/blob/main/contracts/ChainBadge.sol)
- **Explorer Verification**: [Botchain Contract Explorer](https://scan.botchain.ai/address/0x84d6E3ba396939cE921607a15E5e058E29935A59)
- **Contact / Developer**: `liljhnxn`
