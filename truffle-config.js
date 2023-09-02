// Allows us to use ES6 in our migrations and tests.
require('babel-register');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const privateKey = process.env.WALLET_PRIVATE_KEY;
const infuraKey = process.env.INFURA_API_KEY;

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
      gasPrice: 470000000000,
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
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
    linea_mainnet: {
      provider: () => {
        return new HDWalletProvider(
          MNEMONIC,
          `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
        );
      },
      network_id: "59140",
    },
  },
  compilers: {
    solc: {
      version: "0.8.19"
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
}