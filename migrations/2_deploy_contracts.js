var WireToken = artifacts.require("./WireToken.sol");
var WireCrowdsale = artifacts.require("./WireCrowdsale.sol");

module.exports = function(deployer, network, accounts) {

  const startTime = 1511730000; // UNIX timestamp for November 26 2017 21:00 GMT
  const endTime = 1511920800; // UNIX timestamp for November 29 2017 02:00 GMT
  const rate = new web3.BigNumber(1); // Rate of token per wei for the crowdsale TODO AJUSTAR PRECIO (en wei)
  const cap = new web3.BigNumber(10000); // Max amount of wei to raise in the crowdsale TODO AJUSTAR PRECIO (cap = 10000 * rate)
  const wallet = accounts[0] // Wallet to be used in the crowdsale.

  deployer.deploy(WireCrowdsale, startTime, endTime, rate, cap, wallet);
};
