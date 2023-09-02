//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PayLink {

    mapping(bytes32 => uint256 amount) LinkToAmount; 

    constructor()  {}

    receive() external payable{

    }

    function deposit(uint256 amount, bytes32 link) payable public {
        //require(msg.value == amount); do I need?
        LinkToAmount[link] = amount;
    }

    function withdraw(bytes32 link) public {
        require(LinkToAmount[link] > 0);
        uint256 _amount = LinkToAmount[link];
        address _to = payable(msg.sender);
        (bool sent, bytes memory data) = _to.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}