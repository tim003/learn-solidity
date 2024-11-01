async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory
  const Spacebear = await hre.ethers.getContractFactory("Spacebear");

  // Deploy the contract
  const spacebearInstance = await Spacebear.deploy(deployer.address);

  // In ethers v6, the contract is returned after deployment, no need for .deployed()
  console.log(`Deployed Spacebear contract at address: ${spacebearInstance.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




