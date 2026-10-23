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

  console.log("\nEstimating gas & calculating optimal fee...");
  const ChainBadge = await ethers.getContractFactory("ChainBadge");
  const deployTxData = await ChainBadge.getDeployTransaction();
  const estimatedGas = await ethers.provider.estimateGas(deployTxData);
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || 20000000000n;
  const gasLimit = (estimatedGas * 115n) / 100n; // 15% safety buffer; unused gas is refunded by EVM
  const maxEstimatedCost = ethers.formatEther(gasLimit * gasPrice);

  console.log(`Estimated Gas    : ${estimatedGas.toString()} units`);
  console.log(`Gas Limit Set    : ${gasLimit.toString()} units`);
  console.log(`Gas Price        : ${ethers.formatUnits(gasPrice, "gwei")} gwei`);
  console.log(`Max Est. Cost    : ${maxEstimatedCost} BOT (Ultra low fee)`);

  console.log("\nSubmitting deployment transaction to Botchain Mainnet...");
  const chainBadge = await ChainBadge.deploy({ gasLimit, gasPrice });
  const deploymentTx = chainBadge.deploymentTransaction();
  console.log(`Tx Hash          : ${deploymentTx.hash}`);

  console.log("Waiting for block confirmation...");
  const receipt = await chainBadge.waitForDeployment();
  const contractAddress = await chainBadge.getAddress();
  
  const txReceipt = await ethers.provider.getTransactionReceipt(deploymentTx.hash);
  const actualGasUsed = txReceipt ? txReceipt.gasUsed : estimatedGas;
  const actualFeePaid = ethers.formatEther(actualGasUsed * gasPrice);

  console.log("\n==========================================");
  console.log(" ChainBadge Deployed Successfully to Mainnet!");
  console.log("==========================================");
  console.log(`Contract Address : ${contractAddress}`);
  console.log(`Actual Gas Used  : ${actualGasUsed.toString()} units`);
  console.log(`Actual Fee Paid  : ${actualFeePaid} BOT`);
  console.log(`Chain ID         : ${network.config.chainId || (await ethers.provider.getNetwork()).chainId}`);
  console.log(`Block Explorer   : https://scan.botchain.ai/address/${contractAddress}`);
  console.log(`Tx Explorer Link : https://scan.botchain.ai/tx/${deploymentTx.hash}`);
  console.log("==========================================\n");

  // Automatically update .env.local if present
  const fs = require("fs");
  const path = require("path");
  const envLocalPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envLocalPath)) {
    let content = fs.readFileSync(envLocalPath, "utf8");
    if (content.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
      content = content.replace(
        /NEXT_PUBLIC_CONTRACT_ADDRESS=".*"/,
        `NEXT_PUBLIC_CONTRACT_ADDRESS="${contractAddress}"`
      );
      content = content.replace(
        /NEXT_PUBLIC_BOTCHAIN_RPC_URL=".*"/,
        `NEXT_PUBLIC_BOTCHAIN_RPC_URL="https://rpc.botchain.ai"`
      );
      fs.writeFileSync(envLocalPath, content, "utf8");
      console.log(`Updated .env.local with deployed mainnet contract address.`);
    }
  }

  console.log("Next steps:");
  console.log(`1. Frontend contract address updated: ${contractAddress}`);
  console.log(`2. Verify on Explorer: npm run verify:botchain -- ${contractAddress}`);
  console.log(`3. Start frontend: npm run dev`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
