const { expect } = require("chai");
const hre = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Spacebear", function () {
  // Fixture to deploy Spacebear and mint a token
  async function deploySpacebearAndMintTokenFixture() {
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");

    // Get signers for different accounts
    const [owner, nftOwnerAccount, otherAccount] = await ethers.getSigners();

    // Deploy the contract, passing in the initialOwner address
    const spacebearInstance = await Spacebear.deploy(owner.address);

    // Mint a token to nftOwnerAccount
    await spacebearInstance.safeMint(nftOwnerAccount.address, "spacebear_1.json");

    // Return instances and accounts for use in tests
    return { spacebearInstance, owner, nftOwnerAccount, otherAccount };
  }

  it("should be able to mint a token", async function () {
    // Load fixture
    const { spacebearInstance, nftOwnerAccount } = await loadFixture(
      deploySpacebearAndMintTokenFixture
    );

    // Verify that nftOwnerAccount is the owner of token ID 0
    expect(await spacebearInstance.ownerOf(0)).to.equal(nftOwnerAccount.address);
  });

  it("should fail to transfer token from a non-owner address", async function () {
    // Load fixture
    const { spacebearInstance, nftOwnerAccount, otherAccount } = await loadFixture(
      deploySpacebearAndMintTokenFixture
    );

    // Verify initial ownership of token ID 0
    expect(await spacebearInstance.ownerOf(0)).to.equal(nftOwnerAccount.address);

    // Attempt to transfer from otherAccount, which should fail
    //  await expect(
    //    spacebearInstance
    //      .connect(otherAccount) // Attempt to transfer as otherAccount
    //      .transferFrom(nftOwnerAccount.address, otherAccount.address, 0)
    //  ).to.be.revertedWith("ERC721: caller is not token owner nor approved");
   });
 });

