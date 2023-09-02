// Allows us to use ES6 in our migrations and tests.
require('babel-register');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const privateKey = process.env.WALLET_PRIVATE_KEY;
const infuraKey = process.env.INFURA_API_KEY;
const etherscanAPIKey = process.env.ETHERSCAN_PRIVATE_KEY;

module.exports = {
  networks: {
    linea_testnet: {
      provider: () => {
        return new HDWalletProvider(
          [privateKey],
          `https://linea-goerli.infura.io/v3/` + infuraKey,
        );
      },
      network_id: "59140",
      gasPrice: 100000000,
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider([privateKey], 'https://goerli.infura.io/v3/' + infuraKey);
      },
      network_id: '5', 
      gasPrice: 100000000,
    },
    zkEvmTestnet: {
      provider: () => {
        return new HDWalletProvider([privateKey], 'https://rpc.public.zkevm-test.net');
      },
      network_id: '1442', 
      gasPrice: 100000000,
    },
    taikoTestnet: {
      provider: () => {
        return new HDWalletProvider([privateKey], 'https://rpc.test.taiko.xyz');
      },
      network_id: '167005', 
      gasPrice: 100000000,
    },
    sepolia: {
      provider: function () {
        return new HDWalletProvider([walletPrivateKey], 'https://sepolia.infura.io/v3/' + infuraKey);
      },
      network_id: '11155111',
      networkCheckTimeout: 60000,
    },
    // linea_mainnet: {
    //   provider: () => {
    //     return new HDWalletProvider(
    //       MNEMONIC,
    //       `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    //     );
    //   },
    //   network_id: "59140",
    // },
  },
  compilers: {
    solc: {
      version: "0.8.19"
    }
  },
  settings: {          // See the solidity docs for advice about optimization and evmVersion
    optimizer: {
      enabled: true,
      runs: 200
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscanAPIKey,
  },
}