pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/StandardToken.sol";

contract WireToken is StandardToken {

  string public name = "WireToken";

  string public symbol = "WIRE";

  uint public decimals = 18;

  uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);

  function WireToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}