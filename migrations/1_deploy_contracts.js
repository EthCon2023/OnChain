const payLink = artifacts.require("PayLink");
const payLinkInterchain = artifacts.require("PayLinkInterchain");

module.exports = function (deployer) {
  const gatewayAddress = "0xe432150cce91c13a887f7D836923d5597adD8E31"; // goerli
  const gasReceiverAddress = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
  deployer.deploy(payLinkInterchain, gatewayAddress);
};