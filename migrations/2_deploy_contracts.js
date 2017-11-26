var WireToken = artifacts.require("./WireToken.sol");
var WireCrowdsale = artifacts.require("./WireCrowdsale.sol");

module.exports = function(deployer) {

  const startTime = 1511733600; // UNIX timestamp for November 26 2017 21:00 GMT
  const endTime = 1511920800; // UNIX timestamp for November 29 2017 02:00 GMT
  const rate = new web3.BigNumber(1); // Rate of token per wei for the crowdsale 
  const cap = new web3.BigNumber(437215809723670000000); // Max amount of wei to raise in the crowdsale TODO AJUSTAR PRECIO 
  const wallet = '0xA5e60395392Da68D69811B9C02837A44B49d955e' // Wallet to be used in the crowdsale.

  deployer.deploy(WireCrowdsale, startTime, endTime, rate, cap, wallet);
};
