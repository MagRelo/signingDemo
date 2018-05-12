pragma solidity 0.4.19;
import "./Servesa.sol";

contract ServesaFactory {
    uint public contractCount;
    mapping(address => address[]) public contracts;

    function newContract(
        address providerAddress,
        address ownerAddress,
        uint tokenBasePrice,
        uint32 reserveRatio) public returns (address newAddress) {

        Servesa contractId = new Servesa(
            ownerAddress,
            oracleAddress,
            tokenBasePrice,
            reserveRatio
        );

        contracts[msg.sender].push(contractId);
        contractCount += 1;

        return contractId;
    }

    function getContractAddress() public view returns (address[]) {
        return contracts[msg.sender];
    }
}