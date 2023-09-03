//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract PayLinkInterchain is AxelarExecutable{
    IAxelarGasService public immutable gasService;

    mapping(bytes32 => uint256 amount) private LinkToAmount; 

    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    receive() external payable{

    }

    function deposit(bytes32 link) payable public {
        //require(msg.value == amount); do I need?
        LinkToAmount[link] = msg.value;
    }
    
    function sendTokens(
        string memory destinationChain,
        string memory destinationAddress,
        bytes32 link,
        string memory symbol,
        uint256 amount
    ) external payable {
        require(msg.value > 0, 'Gas payment is required');

        address tokenAddress = gateway.tokenAddresses(symbol);
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        IERC20(tokenAddress).approve(address(gateway), amount);
        bytes memory payload = abi.encode(link);
        gasService.payNativeGasForContractCallWithToken{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            symbol,
            amount,
            msg.sender
        );
        gateway.callContractWithToken(destinationChain, destinationAddress, payload, symbol, amount);
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