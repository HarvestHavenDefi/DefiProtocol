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
    },
    BaseMainnet: {
      url: process.env.RPC_PROVIDER_MAINNET!,
      accounts: [process.env.PRIVATE_KEY!],
    },
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
