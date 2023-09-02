const payLink = artifacts.require("PayLink");
const payLinkInterchain = artifacts.require("PayLinkInterchain");

module.exports = function (deployer) {
  const gatewayAddress = "0xe432150cce91c13a887f7D836923d5597adD8E31"; // goerli
  deployer.deploy(payLink);
  deployer.deploy(payLinkInterchain, gatewayAddress);
};