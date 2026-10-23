# ChainBadge — Whitepaper

**Decentralized Achievement Attestation & Sovereign On-Chain Identity on Botchain**  
*Version 1.0 — October 2026*  
*Repository: [https://github.com/liljhnxn/chainbadge](https://github.com/liljhnxn/chainbadge)*  
*Network: Botchain Mainnet (Chain ID: 677)*  
*Verified Contract: [0x84d6E3ba396939cE921607a15E5e058E29935A59](https://scan.botchain.ai/address/0x84d6E3ba396939cE921607a15E5e058E29935A59)*  

---

## Executive Summary

As decentralized networks expand, recognizing genuine early participants, active community members, and trustworthy accounts becomes paramount. Traditional identity and reputation systems rely heavily on centralized databases, custodial platforms, or complex non-fungible token (NFT) protocols encumbered by gas overhead and external metadata dependencies.

**ChainBadge** is a minimalist, gas-optimized, and immutable on-chain digital achievement registry deployed natively on the **Botchain** blockchain. The protocol issues non-transferable, tamper-proof digital attestations—beginning with the flagship **"Early Achiever"** badge—directly recorded on the blockchain ledger. ChainBadge strictly guarantees one claim per wallet address, creates permanent cryptographic proof with block timestamps, and operates with zero centralized databases, backdoors, or intermediary indexers. It serves as an open public good primitive for community gating, airdrop verification, and on-chain sybil-resistance across the Botchain ecosystem.

---

## 1. Problem Statement

### 1.1 The Fragility of Off-Chain Reputation
In Web2 and hybrid Web3 ecosystems, reputation, badges, and roles are predominantly stored in Discord servers, Discourse forums, or centralized cloud databases (Firebase, AWS, Supabase). These credentials suffer from:
- **Centralized Vulnerability**: Data can be wiped, manipulated, or revoked arbitrarily by server administrators.
- **Lack of Composability**: Smart contracts on-chain cannot natively query off-chain reputation without expensive, insecure oracle bridges.
- **Platform Lock-In**: User history does not follow their sovereign wallet address across decentralized applications.

### 1.2 Over-Engineered NFT Badges
While ERC-721 and ERC-1155 tokens are frequently used for digital credentials, they present significant drawbacks when applied to simple identity attestations:
- **Transferability Issues**: Traditional NFTs can be traded or transferred to secondary wallets, enabling badge speculation and compromising the integrity of proof-of-early-adoption.
- **Gas Inefficiency**: Minting complex ERC-721 contracts incurs unnecessary storage bloat, event costs, and ERC-165 interface query overhead.
- **Off-Chain Metadata Dependency**: Most badge NFTs rely on IPFS or centralized HTTP gateways (e.g. Pinata, AWS S3) for token metadata, introducing single points of failure.

---

## 2. The ChainBadge Solution

ChainBadge provides an ultra-lightweight, purely on-chain alternative designed specifically for ecosystem milestones.

```
+-------------------------------------------------------------------------+
|                              CHAINBADGE                                 |
|                                                                         |
|   +-------------------+      claimBadge()     +---------------------+   |
|   |   User Wallet     | ────────────────────> |   ChainBadge.sol    |   |
|   |  (MetaMask/Rabby) |                       |  (Botchain Mainnet) |   |
|   +-------------------+                       +---------------------+   |
|             ▲                                            │              |
|             │                                            ▼              |
|             │ getClaim()                    [Storage: _claims[address]] |
|             │                               • hasClaimed: true          |
|             │                               • timestamp: block.time     |
|             │                               • totalClaims += 1          |
|             │                                            │              |
|   +-------------------+                                  ▼              |
|   |   Next.js 16 dApp | <──────────────────── [Event: BadgeClaimed]     |
|   |   (Wagmi & Viem)  |    Reactive UI Update                           |
|   +-------------------+                                                 |
+-------------------------------------------------------------------------+
```

### Key Principles:
1. **Single-Claim Integrity**: Every address can claim the badge exactly once. Repeated attempts are rejected at the EVM opcode level (`revert`).
2. **Deterministic On-Chain Metadata**: Name (`"Early Achiever"`), description, claim state, and claim timestamps exist permanently inside smart contract bytecode and storage.
3. **Zero Third-Party Dependencies**: No off-chain indexing services, relational databases, or centralized APIs. The dApp speaks directly to the Botchain RPC.
4. **Composability**: Any external smart contract, DAO governance module, or dApp in the Botchain ecosystem can check `hasClaimed(address)` in O(1) gas cost.

---

## 3. Smart Contract Architecture

The core contract [`ChainBadge.sol`](file:///c:/Users/PROGRESSIVE/Documents/Isaac%20work/Chainbadge/contracts/ChainBadge.sol) is compiled under Solidity `0.8.20` with full optimizer enabled.

### 3.1 Data Structures & Storage Layout

```solidity
struct ClaimRecord {
    bool hasClaimed;      // 1 byte (packed into single 32-byte slot)
    uint256 timestamp;    // 32 bytes (exact block timestamp of claim)
}

mapping(address => ClaimRecord) private _claims;
uint256 public totalClaims;
```

- **Packing & Gas Optimization**: `_claims[address]` maps directly to the user's status. Storage slots are updated strictly during the first and only valid claim.
- **Global Metric**: `totalClaims` provides a transparent, tamper-proof counter of community growth in real time.

### 3.2 Functions & Interface

- `claimBadge() external`:
  - Validates `msg.sender != address(0)` and `!_claims[msg.sender].hasClaimed`.
  - Sets `hasClaimed = true` and `timestamp = block.timestamp`.
  - Increments `totalClaims`.
  - Emits `BadgeClaimed(msg.sender, block.timestamp)`.
- `hasClaimed(address account) external view returns (bool)`:
  - Instant, zero-gas view function for UI checks and external contract verification.
- `getClaim(address account) external view returns (bool claimed, uint256 timestamp)`:
  - Returns claimant validation and exact Unix timestamp of the recorded achievement.

---

## 4. Frontend & Web3 Architecture

The ChainBadge dApp frontend is built with state-of-the-art web performance and security standards:

- **Framework**: Next.js 16 (App Router) with React 19, TypeScript, and Tailwind CSS.
- **Web3 Connectivity**: Wagmi v3 and Viem v2 providing seamless connection across injected wallets (MetaMask, Rabby, Coinbase Wallet, etc.).
- **Data Hydration**: TanStack Query (React Query v5) managing reactive blockchain reading, automatic cache invalidation upon transaction confirmation, and optimistic UI transitions.
- **Safety Checks**: Automatic network verification (Botchain Mainnet `677`), one-click RPC switching, and pending transaction safeguards to prevent duplicate wallet submissions.

---

## 5. Network Configuration & Verification

ChainBadge is deployed and actively verified on **Botchain Mainnet**:

| Parameter | Value |
| :--- | :--- |
| **Network Name** | BOT Chain Mainnet |
| **Chain ID** | `677` (`0x2a5`) |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Native Currency** | BOT (18 Decimals) |
| **Total Supply** | 150 Million BOT |
| **Block Explorer** | `https://scan.botchain.ai` |
| **Contract Address** | `0x84d6E3ba396939cE921607a15E5e058E29935A59` |
| **Explorer Verification** | [View on BotchainScan](https://scan.botchain.ai/address/0x84d6E3ba396939cE921607a15E5e058E29935A59) |

---

## 6. Security Analysis & Test Suite

The smart contract was subjected to automated unit testing under Hardhat with 100% specification compliance across 7 critical test vectors:

1. **Initial Metadata Verification**: Validates `BADGE_NAME` and `BADGE_DESCRIPTION` consistency.
2. **Unclaimed State Isolation**: Confirms newly initialized addresses report `hasClaimed == false` and `timestamp == 0`.
3. **Successful Execution**: Ensures valid wallet callers successfully record `hasClaimed == true` and increment `totalClaims`.
4. **Duplicate Prevention**: Strictly asserts that subsequent calls from the same address revert with `"ChainBadge: Badge already claimed"`.
5. **Timestamp Precision**: Asserts recorded timestamp matches the EVM block timestamp within 1-second accuracy.
6. **Multi-Wallet Independence**: Validates that claims from distinct accounts execute independently without cross-storage pollution.
7. **Event Logging**: Confirms `BadgeClaimed` event emission with indexed claimant address for seamless off-chain listening.

---

## 7. Ecosystem Utility & Roadmap

### Phase 1: Mainnet Launch (Completed)
- Contract deployment and explorer verification on Botchain Mainnet (`677`).
- Responsive, dark-mode glassmorphic client interface.
- 100% test coverage with automated deployment scripts.

### Phase 2: Ecosystem Integration (Q4 2026)
- **DAO & Discord Gating**: Integration with Guild.xyz and Collab.Land for automated role assignment based on `hasClaimed(address)`.
- **Ecosystem Airdrop Gating**: Provisioning a verifiable whitelist for early Botchain mainnet protocols and decentralized exchanges.

### Phase 3: Soulbound Standard Evolution (2027)
- Upgradable extension adhering to **ERC-5192 (Minimal Soulbound Tokens)**.
- Multi-tier dynamic achievements (e.g., Transaction Milestones, Liquidity Provider Badges, Governance Participation).
- Decentralized Identity (DID) integration linking Botchain badges with cross-chain reputation graphs.

---

## 8. Conclusion

ChainBadge demonstrates that Web3 social and identity infrastructure does not require bloated NFT implementations or fragile Web2 databases. By maximizing simplicity, immutability, and gas efficiency, ChainBadge establishes a dependable foundation for verifiable achievement tracking on the Botchain network.
