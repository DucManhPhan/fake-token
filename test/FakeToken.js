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
        it("should be able to transfer tokens from Owner to Alice", async () => {
            let transferedAmount = 50;
            await contractInstance.transfer(alice, transferedAmount, { from: owner });

            assert.equal(await contractInstance.balanceOf(alice), transferedAmount);
        });

        it("should not allow to transfer tokens when Alice has insufficient tokens", async () => {
            let transferedAmount = 60;
            let err = null;

            try {
                await contractInstance.transfer(bob, transferedAmount, { from: alice });
            } catch (error) {
                err = error;
            }

            assert.ok(err instanceof Error);
        });
    });

    context("with Minting tokens", async () => {
        it("should be able to mint tokens for Alice", async () => {
            assert.isTrue(await contractInstance.mint.call(alice, 10, { from: owner }));
        });

        it("should not be able to mint tokens if the sender is not owner", async () => {
            let err = null;

            try {
                await contractInstance.mint.call(alice, 10, { from: bob});
            } catch (error) {
                err = error;
            }

            assert.ok(err instanceof Error);
        });

        it("should not able to mint if the receipt is a zero address", async () => {
            let err = null;

            try {
                await contractInstance.mint.call(0, 10, { from: bob});
            } catch (error) {
                err = error;
            }

            assert.ok(err instanceof Error);
        });

        it("should throw overflow exception when the Alice's tokens or the capacity exceed the max value of uint8 data type", async () => {
            let err = null;

            try {
                await contractInstance.mint.call(alice, 300, { from: owner});
            } catch (error) {
                err = error;
            }

            assert.ok(err instanceof Error);
        });

    });

})