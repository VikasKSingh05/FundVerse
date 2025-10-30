require("dotenv").config();
require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-deploy");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: { optimizer: { enabled: true } },
  },
  networks: {
    zksync_sepolia: {
      url: process.env.ZKSYNC_SEPOLIA_RPC, // from .env
      ethNetwork: "sepolia",
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.17",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
};
