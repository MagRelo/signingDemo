pragma solidity 0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Servesa {
    // using SafeMath for uint256;

    uint public version = 0;

    struct Funder {
        bool exists;
        uint tokenCount;
        uint totalPurchasePrice;
    }

    mapping(address => Funder) public funders;
    mapping(address => uint256) public pendingWithdrawls;

    uint public totalCurrentTokens = 0;
    uint public totalCurrentFunders = 0;

    address public owner;
    address public Provider;
    uint public tokenBasePrice = 100000000000000;

    event NewContract(address ownerAddress, string contractName);
    event Buy(address indexed funder, uint tokenCount);
    event Approve(address indexed funder, uint value);
    event Withdraw(address indexed funder, uint value);
    event FallbackEvent(address sender, uint amount);

    function Servesa(
        address ownerAddress,
        address oracleAddress,
        string contractNameInit,
        string contractAvatarUrlInit,
        uint tokenBasePriceInit) public {

        owner = ownerAddress;
        oracle = oracleAddress;
        contractName = contractNameInit;
        contractAvatarUrl = contractAvatarUrlInit;
        tokenBasePrice = tokenBasePriceInit;

        emit NewContract(owner, contractName);
    }

  // Modifiers

    // Auth
    modifier onlyByOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier onlyByOracle() {
        require(msg.sender == oracle);
        _;
    }
    modifier onlyByFunder() {
        require(isFunder(msg.sender));
        _;
    }

    // Contract options
    modifier belowMaxTokens() {
        require(totalCurrentTokens < maxTokens);
        _;
    }

  /*
   * External accounts can pay directly to contract - bonus!
   */
    function () payable public {
        emit FallbackEvent(msg.sender, msg.value);
    }

    /*
    * Buy: exchange ETH for tokens
    */
    function buy() public payable {

        // prevent oracle deposit
        require(msg.sender != oracle);

        // check that sender sent enough value to purchase at least one token
        require(msg.value >= tokenBasePrice);

        // Update funders array
        if (!isFunder(msg.sender)) {

            // add to funder map
            funders[msg.sender] = Funder({
                exists: true,
                tokenCount: 1,
                totalPurchasePrice: tokenBasePrice
            });

            // Increase total funder count
            totalCurrentFunders = totalCurrentFunders.add(1);

        } else {

            funders[msg.sender].tokenCount = funders[msg.sender].tokenCount.add(1);
            funders[msg.sender].totalPurchasePrice = funders[msg.sender].totalPurchasePrice.add(tokenBasePrice);

        }

        // increment total token count
        totalCurrentTokens = totalCurrentTokens.add(1);

        // refund overage
        if (msg.value.sub(tokenBasePrice) > 0) {
            msg.sender.transfer(msg.value.sub(tokenBasePrice));
        }

        // event
        emit Buy(msg.sender, funders[msg.sender].tokenCount);
    }

    /*
    * Sell: exchange tokens for ETH
    */
    function withdraw(uint amount) public onlyByFunder {

        // check approved withdrawl list

        // calculate sell price
        uint cashOutValue = 1;

        // send seller value == tokenSellPrice * tokens
        msg.sender.transfer(cashOutValue);

        // event
        emit Withdraw(msg.sender, cashOutValue);
    }

    /*
    * approveWithdrawl: oracle function to allow player withdrawl
    */
    function approveWithdrawl(address funder, uint value) public onlyByOracle {

        // prevent oracle self-withdrawl
        require(funder != oracle);

        // add to pendingWithdrawls
        pendingWithdrawls[funder] = value;

        // event
        emit Approve(funder, value);
    }



    /*
    * getters
    */
    function getContractBalance() public view returns(uint256 balance) {
        balance = this.balance;
    }

    function isFunder(address addr) public view returns(bool) {
        return funders[addr].exists;
    }

    function getFunderTokens(address addr) public view returns(uint256) {
        return funders[addr].tokenCount;
    }

    function getFunderPurchase(address addr) public view returns(uint256) {
        return funders[addr].totalPurchasePrice;
    }

    function getCurrentTotalFunders() public view returns(uint) {
        return totalCurrentFunders;
    }

}