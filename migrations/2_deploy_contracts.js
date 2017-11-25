var WireToken = artifacts.require("./WireToken.sol");
var WireCrowdsale = artifacts.require("./WireCrowdsale.sol");

module.exports = function(deployer) {
  deployer.deploy(WireToken);
  deployer.deploy(WireCrowdsale);
};
