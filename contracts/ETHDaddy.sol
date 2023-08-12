// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ETHDaddy is ERC721 {

   address public owner ; 
   uint public count = 0 ;

   struct  Domain {
    string  name ;
    uint  cost;
    bool isOwned ;

  }

   mapping(uint => Domain) public domains ;

   modifier onlyOwner {
      require(msg.sender == owner , 'just owner can add a domain to list');
      _;
   }

   modifier cost(uint _id ) {
    uint _cost = domains[_id].cost ;
    require(msg.value >= _cost , 'Minimums ethers required' );
    _;
   }

   constructor(string memory _name , string memory _symbol) ERC721 (_name ,_symbol){

     owner = msg.sender ;
   }

   function  list (string memory _nam , uint  _cost) public onlyOwner(){
   
    domains[count] = Domain(_nam , _cost , false) ;
    count ++ ;

   }

   function mint (uint _id ) public payable cost(_id) {
    domains[_id].isOwned = true ;
    _safeMint(msg.sender, _id );
   }

   function getDom(uint _id) public view returns(Domain memory) {
    return domains[_id] ;
   }

   function withdraw() onlyOwner() public {
    payable(owner).transfer(address(this).balance);
   }

    function getBalance(address _address) public view returns(uint ) {
    return _address.balance ;
   }

}
