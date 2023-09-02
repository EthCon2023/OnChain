const payLink = artifacts.require("PayLink");

module.exports = function (deployer) {
  deployer.deploy(payLink);
};