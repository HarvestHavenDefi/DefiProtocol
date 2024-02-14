import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {
    //   chainId: 84531,
    //   forking: {
    //     url: process.env.RPC_PROVIDER_TESTNET!,
    //   },
    //   accounts: [
    //     {
    //       privateKey: process.env.PRIVATE_KEY!,
    //       balance: "10000000000000000000000",
    //     },
    //     {
    //       privateKey: process.env.PRIVATE_KEY2!,
    //       balance: "10000000000000000000000",
    //     },
    //   ],
    // },
    BaseTestnet: {
      url: process.env.RPC_PROVIDER_TESTNET!,
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: 35000000000,
    },
    BaseMainnet: {
      url: process.env.RPC_PROVIDER_MAINNET!,
      accounts: [process.env.PRIVATE_KEY!],
      // gasPrice: 35000000000,
    },
  },
  etherscan: {
    apiKey: {
      BaseMainnet: process.env.BASE_SCAN_API_KEY!,
      BaseTestnet: process.env.BASE_SCAN_API_KEY!,
    },
    customChains: [
      {
        network: "BaseTestnet",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
      {
        network: "BaseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        },
      },
    ],
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
