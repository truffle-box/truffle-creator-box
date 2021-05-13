const TruffleCreator = artifacts.require("TruffleCreator");

module.exports = function(deployer) {
  deployer.deploy(TruffleCreator);
};
