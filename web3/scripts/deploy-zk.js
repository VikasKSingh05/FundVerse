const { Wallet, Provider } = require("zksync-web3");
const hre = require("hardhat");

async function main() {
  const provider = new Provider(process.env.ZKSYNC_SEPOLIA_RPC);
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  const artifact = await hre.artifacts.readArtifact("CrowdFunding");

  const factory = new hre.ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  const contract = await factory.deploy();
  await contract.deployed();
  console.log("CrowdFunding deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
