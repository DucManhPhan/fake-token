const FakeToken = artifacts.require("FakeToken");

contract("FakeToken", (accounts) => {

    const ftTokenName = "Fake Token";
    const ftTokenSymbol = "FT";
    const ftTotalSupply = 200;

    let contractInstance;
    let [owner, alice, bob] = accounts;

    beforeEach(async () => {
        const txParams = {
            from: owner
        };

        contractInstance = await FakeToken.new(txParams);
    });

    context("with the initialization Fake Token scenario", async () => {
        it("should be able to create a token's name", async () => {
            assert.equal(await contractInstance.name(), ftTokenName);
        })

        it("should be able to create a token's symbol", async () => {
            assert.equal(await contractInstance.symbol(), ftTokenSymbol);
        })

        it("should be able to create hard cap", async () => {
            assert.equal(await contractInstance.totalSupply(), ftTotalSupply);
        });
    });

    context("with Transfer tokens", async () => {
        it("should be able to transfer from Owner to Alice", async () => {
            let transferedAmount = 50;
            await contractInstance.transfer(alice, transferedAmount, { from: owner });
            assert.equal(await contractInstance.balanceOf(alice), transferedAmount);
        })

        it("", async () => {
        })
    });

    context("with Minting tokens", async () => {
        it("", async () => {
        })

        it("", async () => {
        })
    });

})