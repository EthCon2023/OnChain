// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Basic is ERC20, Ownable {

    constructor() ERC20("", "") {}
        
    function mint(
    address _to,
    uint256 _amount // Amount of tokens
    ) external onlyOwner { 
        _mint(_to, _amount * 10 ** decimals());
    }
    
}