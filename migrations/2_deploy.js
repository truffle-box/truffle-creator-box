const Remixr = artifacts.require("Remixr");

module.exports = function(deployer) {
  deployer.deploy(Remixr, "Remixr", "RMXR");
};
