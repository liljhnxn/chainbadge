const { ethers, network } = require("hardhat");

async function main() {
  console.log("==========================================");
  console.log(`Deploying ChainBadge to network: ${network.name}`);
  console.log("==========================================");

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account configured. Please ensure PRIVATE_KEY is set in your .env file."
    );
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer Address : ${deployer.address}`);
  console.log(`Account Balance  : ${ethers.formatEther(balance)} BOT`);

  console.log("\nDeploying ChainBadge contract...");
  const ChainBadge = await ethers.getContractFactory("ChainBadge");
  const chainBadge = await ChainBadge.deploy();

  await chainBadge.waitForDeployment();
  const contractAddress = await chainBadge.getAddress();

  console.log("\n==========================================");
  console.log(" ChainBadge Deployed Successfully!");
  console.log("==========================================");
  console.log(`Contract Address : ${contractAddress}`);
  console.log(`Chain ID         : ${network.config.chainId || (await ethers.provider.getNetwork()).chainId}`);
  console.log(`Block Explorer   : https://scan.bohr.life/address/${contractAddress}`);
  console.log("==========================================\n");
  console.log("Next steps:");
  console.log(`1. Add to your .env.local file:`);
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS="${contractAddress}"`);
  console.log(`2. Start the frontend: npm run dev`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
