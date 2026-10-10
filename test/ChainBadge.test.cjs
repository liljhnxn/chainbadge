const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainBadge Smart Contract", function () {
  let chainBadge;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const ChainBadge = await ethers.getContractFactory("ChainBadge");
    chainBadge = await ChainBadge.deploy();
    await chainBadge.waitForDeployment();
  });

  describe("Metadata", function () {
    it("should initialize with correct badge name and description", async function () {
      expect(await chainBadge.BADGE_NAME()).to.equal("Early Achiever");
      expect(await chainBadge.BADGE_DESCRIPTION()).to.equal(
        "Awarded to early pioneers of the Botchain ecosystem."
      );
      expect(await chainBadge.totalClaims()).to.equal(0n);
    });

    it("should report hasClaimed as false for unclaimed addresses", async function () {
      expect(await chainBadge.hasClaimed(user1.address)).to.equal(false);
      const [claimed, timestamp] = await chainBadge.getClaim(user1.address);
      expect(claimed).to.equal(false);
      expect(timestamp).to.equal(0n);
    });
  });

  describe("Badge Claiming", function () {
    it("should allow a wallet to claim the badge successfully", async function () {
      await chainBadge.connect(user1).claimBadge();

      expect(await chainBadge.hasClaimed(user1.address)).to.equal(true);
      expect(await chainBadge.totalClaims()).to.equal(1n);
    });

    it("should prevent a wallet from claiming twice", async function () {
      await chainBadge.connect(user1).claimBadge();

      await expect(
        chainBadge.connect(user1).claimBadge()
      ).to.be.revertedWith("ChainBadge: Badge already claimed");
    });

    it("should record the correct claim timestamp on-chain", async function () {
      const tx = await chainBadge.connect(user1).claimBadge();
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      const [claimed, timestamp] = await chainBadge.getClaim(user1.address);
      expect(claimed).to.equal(true);
      expect(timestamp).to.equal(BigInt(block.timestamp));
    });

    it("should allow another wallet to claim independently", async function () {
      await chainBadge.connect(user1).claimBadge();
      expect(await chainBadge.hasClaimed(user2.address)).to.equal(false);

      await chainBadge.connect(user2).claimBadge();
      expect(await chainBadge.hasClaimed(user2.address)).to.equal(true);
      expect(await chainBadge.totalClaims()).to.equal(2n);

      const [user1Claimed] = await chainBadge.getClaim(user1.address);
      const [user2Claimed] = await chainBadge.getClaim(user2.address);
      expect(user1Claimed).to.equal(true);
      expect(user2Claimed).to.equal(true);
    });

    it("should emit BadgeClaimed event with correct arguments", async function () {
      const tx = await chainBadge.connect(user1).claimBadge();
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      await expect(tx)
        .to.emit(chainBadge, "BadgeClaimed")
        .withArgs(user1.address, block.timestamp);
    });
  });
});
