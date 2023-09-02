//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PayLink is Ownable {

    mapping(bytes32 => uint256 amount) LinkToAmount; 
    constructor()  {}
    

    receive() external payable{

    }

    function deposit(uint256 amount, bytes32 link) payable public {
        //require(msg.value == amount); do I need?
        LinkToAmount[link] = amount;

    }

    function withdraw(bytes32 link) public {
        
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}