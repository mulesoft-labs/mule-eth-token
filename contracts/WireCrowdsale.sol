pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/FinalizableCrowdsale.sol";
import "./WireToken.sol";

contract WireCrowdsale is CappedCrowdsale, FinalizableCrowdsale {

  uint256 public constant TOTAL_SHARE = 100;
  uint256 public constant CROWDSALE_SHARE = 60;
  uint256 public constant FOUNDATION_SHARE = 40;

  bool public hasBeenEndedByOwner = false;

  function WireCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, uint256 _cap, address _wallet) public
    CappedCrowdsale(_cap)
    FinalizableCrowdsale()
    Crowdsale(_startTime, _endTime, _rate, _wallet)
  {
  	WireToken(token).pause();
  }

  // Unpause token transfers.
  function unpauseToken() onlyOwner public {
    require(isFinalized);
    WireToken(token).unpause();
  }

  // Pause token transfers.
  function pauseToken() onlyOwner public {
    require(isFinalized);
    WireToken(token).pause();
  }

  // Create new tokens.
  function mintTokens(address _to, uint256 _amount) onlyOwner public {
    WireToken(token).mint(_to, _amount);
  }

  // Manually end the crowdsale.
  function end() onlyOwner public {
    hasBeenEndedByOwner = true;
  }

  // Override Crowdsale#hasEnded to add logic for manual ending
  // @return true if crowdsale event has ended normally or has been manually ended by user.
  function hasEnded() public view returns (bool) {
    return super.hasEnded() || hasBeenEndedByOwner;
  }

  function createTokenContract() internal returns (MintableToken) {
    return new WireToken();
  }

  function finalization() internal {
    uint256 totalSupply = token.totalSupply();
    uint256 finalSupply = TOTAL_SHARE.mul(totalSupply).div(CROWDSALE_SHARE);

    token.mint(wallet, FOUNDATION_SHARE.mul(finalSupply).div(TOTAL_SHARE));

    super.finalization();
  }

}