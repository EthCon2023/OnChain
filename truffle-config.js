// Allows us to use ES6 in our migrations and tests.
require('babel-register');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const privateKey = process.env.WALLET_PRIVATE_KEY;

module.exports = {
  networks: {
    linea_testnet: {
      provider: () => {
        return new HDWalletProvider(
          [privateKey],
          `https://linea-goerli.infura.io/v3/0cbd49cd77ed4132b497031ffc95da6a`,
        );
      },
      network_id: "59140",
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    }
  },
  compilers: {
    solc: {
      version: "^0.8.9"
    }
  }
}