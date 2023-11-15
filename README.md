# Harvest Haven (DeFi)

<a href="https://harvesthaven.gitbook.io/" target="_blank">Harvest Haven Gitbook</a> 🌱

Mainnet Chain: Base (CHAIN ID: 8453)

Testnet Chain: Base Goerli (CHAIN ID: 84531) -> Faucet: https://bwarelabs.com/faucets/base-testnet

## Steps to reproduce

1. Clone the repository
2. Run `npm i`
3. Create a .env file following .env.example.

### Once enviroments are set up

- Smart contract Testing (Base Goerli fork):

  - Run: `npx hardhat test`

- For deployment:
  - Run: `npx hardhat run scripts/<DEPLOYMENT SCRIPT.TS> --network "<CHOOSEN NETWORK>"`

_Note: Network options:_

    - "hardhat": Forking Base Goerli testnet.
    - "BaseMainnet": Base Mainnet  
    - "BaseTestnet": Base Goerli Testnet

      
### `.env.example`

```.env
# Manager (Total supply receiver)
MANAGER_PUBLIC_KEY=xxxxx

# Deployers & Testing
PRIVATE_KEY=xxxx
PRIVATE_KEY2=xxxxx

# RPC PROVIDERS
RPC_PROVIDER_MAINNET=https://mainnet.base.org
RPC_PROVIDER_TESTNET=https://goerli.base.org

# CHAIN ID Used for Forking
CHAIN_ID_TESTNET=84531
```
