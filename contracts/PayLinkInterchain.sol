//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract PayLinkInterchain is AxelarExecutable{
    IAxelarGasService public immutable gasService;
    address tokenAddress;
    mapping(string => uint256 amount) private LinkToAmount; 

    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    receive() external payable{

    }

    function deposit(string memory link) payable public { // deposits ETH for onechain
        //require(msg.value == amount); do I need?
        LinkToAmount[link] = msg.value;
    }
    
    function sendTokens(
        string memory destinationChain,
        string memory destinationAddress,
        string memory link,
        uint256 amount
    ) external payable {
        require(msg.value > 0, 'Gas payment is required');

        string memory symbol = "WETH";
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

    function withdrawTokens(string memory link) public {
        require(LinkToAmount[link] > 0, "Wrong Link");
        uint256 _amount = LinkToAmount[link];
        address _to = payable(msg.sender);
        IERC20(tokenAddress).transferFrom(address(this), _to, _amount);
    }

    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata tokenSymbol,
        uint256 amount
    ) internal override {
        string memory link = abi.decode(payload, (string));
        if (tokenAddress == address(0)){
            address tokenAddress = gateway.tokenAddresses(tokenSymbol);
        }
        LinkToAmount[link]= amount;
    }
}