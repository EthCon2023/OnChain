const Token = artifacts.require("ERC20Basic");

module.exports = function (deployer) {
  deployer.deploy(Token);
};