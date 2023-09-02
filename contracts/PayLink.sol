//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxelarExecutable } from './imports/AxelarExecutable.sol';

contract PayLink {

    mapping(bytes32 => uint256 amount) LinkToAmount; 

    constructor()  {}

    receive() external payable{

    }

    function deposit(bytes32 link) payable public {
        //require(msg.value == amount); do I need?
        LinkToAmount[link] = msg.value;
    }

    function withdraw(bytes32 link) public returns(bytes memory){
        require(LinkToAmount[link] > 0);
        uint256 _amount = LinkToAmount[link];
        address _to = payable(msg.sender);
        (bool sent, bytes memory data) = _to.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        return data;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}