pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/BurnableToken.sol";
import "zeppelin-solidity/contracts/token/PausableToken.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract WireToken is BurnableToken, PausableToken, MintableToken {

  string public constant name = "WireToken";

  string public constant symbol = "WIRE";

  uint8 public constant decimals = 18;

  // Override burn function to avoid burning when token is paused.
  function burn(uint256 _value) whenNotPaused public {
    super.burn(_value);
  }
}