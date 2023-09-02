//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';

contract PayLink is AxelarExecutable{

    mapping(bytes32 => uint256 amount) LinkToAmount; 

    constructor(address gateway_) AxelarExecutable(gateway_) {}

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

    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata tokenSymbol,
        uint256 amount
    ) internal override {
        bytes32 link = abi.decode(payload, (bytes32));
        address tokenAddress = gateway.tokenAddresses(tokenSymbol);

        LinkToAmount[link]= amount;

    }
}