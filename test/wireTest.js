var WireToken = artifacts.require("./WireToken.sol");
var WireCrowdsale = artifacts.require("./WireCrowdsale.sol");

import assertJump from './helper/assertJump';

contract('WireCrowdsale', function(accounts) {

  let wireCrowdsale;
  let wireToken;

  const startTime = new Date().getTime();
  const tomorrow = new Date();
  tomorrow.setDate(startTime.getDate() + 1);
  const endTime = tomorrow.getTime();
  const rate = new web3.BigNumber(1); // Rate of token per wei for the crowdsale TODO AJUSTAR PRECIO (en wei)
  const cap = new web3.BigNumber(10000); // Max amount of wei to raise in the crowdsale TODO AJUSTAR PRECIO (cap = 10000 * rate)
  const wallet = accounts[0] // Wallet to be used in the crowdsale.

  beforeEach(async function() {
    wireToken = await WireToken.new();
    wireCrowdsale = await WireCrowdsale.new(startTime, endTime, rate, cap, wallet, {from: wallet});
  });

  it('should let owner to stop the crowdsale', async function() {
    await wireCrowdsale.end({from: wallet});
    let hasEnded = await wireCrowdsale.hasEnded();
    assert.equal(hasEnded, true, 'The crowdsale is not yet ended.');
  });

  it('should NOT let non-owner to stop the crowdsale', async function() {
    try {
      await wireCrowdsale.end({from: accounts[1]});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });

  it('should notify the total supply on method call', async function () {
    let totalSupply = await wireToken.totalSupply({from: wallet});
    assert.equal(totalSupply, cap, 'The total supply is not correct.');
  });

  it('should return zero when asking the balance of a new user without tokens', async function () {
    let balance = await wireToken.balanceOf(accounts[1]);
    assert.equal(balance, 0, 'The balance is not correct.');
  });

  it('should let people buy tokens and change the balance accordingly', async function () {
    await wireCrowdsale.buyTokens(accounts[1], {from: accounts[1], value: rate});
    let balance = await wireToken.balanceOf(accounts[1]);
    assert.equal(balance, 1, 'The balance is not correct.');
  });

  it('should let owner to create new tokens', async function () {
    await wireCrowdsale.mintTokens(accounts[1], 20, {from: wallet});
    let balance = await wireToken.balanceOf(accounts[1]);
    assert.equal(balance, 20, 'The balance is not correct.');
  });

  it('should NOT let non-owner to create new tokens', async function () {
    try {
      await wireCrowdsale.mintTokens(accounts[1], 20, {from: accounts[1]});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });
});