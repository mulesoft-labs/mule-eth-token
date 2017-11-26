require("babel-polyfill");
require("babel-register");
var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "some ropsten Infura API key";
var mnemonic = "list of mnemonic words";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4512288
    },
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
