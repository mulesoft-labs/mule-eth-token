var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "lURhQbmr92ZWN9vCjt55";
var mnemonic = "repeat loan salad quantum toe walk peanut tiger fork arena piano van";

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
      gas: 4212288
    }
  }
};