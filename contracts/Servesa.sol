pragma solidity 0.4.24;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

import "./BancorFormula.sol";

// TEST: "0x106F681949E222D57A175cD85685E3bD9975b973","TEST", "TEST", 100000000000000, 300000, 1000

contract Servesa is ERC721Token, BancorFormula {

  uint public version = 0;
  address public owner;
  address public provider;
  string public tokenName;
  string public tokenSymbol;
  
  uint256 public tokenBasePrice = 100000000000000;
  uint256 public tokenReserveRatio = 300000;
  uint256 public maxTokens = 1000;
  
  uint256 public totalCurrentTokens = 0;
  uint256 public contractBalance = 0;

  event NewContract(address ownerAddress, string tokenSymbol);
  event Buy(address indexed funder, uint tokenCount);
  event Sell(address indexed funder, uint value);
  event Transfer(address indexed _from, address indexed _to, uint value);
  event FallbackEvent(address sender, uint amount);


  /*
  * Constructor
  */
  
  constructor (
    address ownerAddress,
    string tokenNameInit,
    string tokenSymbolInit,
    uint256 tokenBasePriceInit,
    uint256 tokenReserveRatioInit,
    uint256 maxTokensInit) ERC721Token (tokenNameInit, tokenSymbolInit) public {

    // setup parent contract as provider
    provider = msg.sender;

    // setup contract parameters
    owner = ownerAddress;
    tokenName = tokenNameInit;
    tokenSymbol = tokenSymbolInit;
    tokenBasePrice = tokenBasePriceInit;
    tokenReserveRatio = tokenReserveRatioInit;
    maxTokens = maxTokensInit;

    emit NewContract(owner, tokenSymbol);
  }


  // modifiers
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

    /*
    * Calc price
    */
    // uint tokenPrice = tokenBasePrice;
    
    /*
    * Calc tokens
    */
    uint256 tokensToMint = calculatePurchaseReturn(totalCurrentTokens, contractBalance, 300000, msg.value);
    
    /*
    * add token count to metadata - we'll actually only create one ERC-721 token
    */


    /*
    * Create new tokens for sender
    */
    // super._mint(msg.sender, tokenId);

    /*
    * Refund overage
    */

    // event
    emit Buy(msg.sender, tokensToMint);
  }

  /*
  * Sell: exchange tokens for ETH
  */
  function sell(uint amount) public {

    /*
    * Calc ETH value
    */


    /*
    * burn tokens
    */


    /*
    * Send ETH
    */

    // event
    emit Sell(msg.sender, 0);
  }

  /*
  * Transfer: change owner of tokens
  */
  function transfer(uint amount) public {

    
    /*
    * Implement ERC721 safeTransfer
    */

    // event
    // emit Transfer('0x', '1x', 0);
  }

  /*
  * getters
  */
  // function getContractBalance() public view returns(uint256 balance) {
  //     balance = this.balance;
  // }

  // function isFunder(address addr) public view returns(bool) {
  //     return funders[addr].exists;
  // }

  // function getFunderTokens(address addr) public view returns(uint256) {
  //     return funders[addr].tokenCount;
  // }

  // function getFunderPurchase(address addr) public view returns(uint256) {
  //     return funders[addr].totalPurchasePrice;
  // }

  // function getCurrentTotalFunders() public view returns(uint) {
  //     return totalCurrentFunders;
  // }

}