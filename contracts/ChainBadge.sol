// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ChainBadge
 * @dev Simple on-chain achievement badge registry on Botchain Mainnet.
 * Each wallet address can claim the "Early Achiever" badge only once.
 */
contract ChainBadge {
    // Badge metadata
    string public constant BADGE_NAME = "Early Achiever";
    string public constant BADGE_DESCRIPTION = "Awarded to early pioneers of the Botchain ecosystem.";

    // Struct to store claim details
    struct ClaimRecord {
        bool hasClaimed;
        uint256 timestamp;
    }

    // Mapping from wallet address to claim details
    mapping(address => ClaimRecord) private _claims;

    // Total count of claimed badges
    uint256 public totalClaims;

    // Event emitted when a badge is claimed
    event BadgeClaimed(address indexed recipient, uint256 timestamp);

    /**
     * @notice Allows the caller to claim their Early Achiever badge.
     * @dev Reverts if the badge was already claimed by msg.sender.
     */
    function claimBadge() external {
        require(msg.sender != address(0), "ChainBadge: Invalid address");
        require(!_claims[msg.sender].hasClaimed, "ChainBadge: Badge already claimed");

        _claims[msg.sender] = ClaimRecord({
            hasClaimed: true,
            timestamp: block.timestamp
        });

        totalClaims += 1;

        emit BadgeClaimed(msg.sender, block.timestamp);
    }

    /**
     * @notice Checks if an address has already claimed the badge.
     * @param account The wallet address to query.
     * @return bool True if claimed, false otherwise.
     */
    function hasClaimed(address account) external view returns (bool) {
        return _claims[account].hasClaimed;
    }

    /**
     * @notice Retrieves full claim details for a wallet address.
     * @param account The wallet address to query.
     * @return claimed Boolean indicating if badge was claimed.
     * @return timestamp Unix timestamp of the claim (0 if not claimed).
     */
    function getClaim(address account) external view returns (bool claimed, uint256 timestamp) {
        ClaimRecord memory record = _claims[account];
        return (record.hasClaimed, record.timestamp);
    }
}
