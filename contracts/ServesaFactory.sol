pragma solidity 0.4.24;

import "./Servesa.sol";

contract ServesaFactory {
  uint public contractCount;
  mapping(address => address[]) public contracts;

  function newContract(
    address ownerAddress,
    string tokenName,
    string tokenSymbol,
    uint tokenBasePrice,
    uint maxTokens) public returns (address newAddress) {

    Servesa contractId = new Servesa(
      ownerAddress,
      tokenName,
      tokenSymbol,
      tokenBasePrice,
      maxTokens
    );

    contracts[msg.sender].push(contractId);
    contractCount += 1;

    return contractId;
  }

  function getContractAddress() public view returns (address[]) {
    return contracts[msg.sender];
  }
}