// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract FakeToken {

    string private _name;

    string private _symbol;

    uint256 private _totalSupply;

    address private _owner;

    /**
     * Save the amount of tokens that is corresponding the specific address.
     */
    mapping (address => uint256) private _balances;

    event Transfer(address indexed from, address indexed to, uint value);

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        _owner = msg.sender;
        _name = name_;
        _symbol = symbol_;

        _mint(_owner, totalSupply_);
    }

    /**
     * Move `amount` tokens from the caller's account to `to` account.
     * 
     * Returns a boolean value indicating whether the operation succeeded.
     * Emits a Transfer event.
     */
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf(msg.sender) >= amount, "Insufficient funds");

        _balances[to] += amount;
        _balances[msg.sender] -= amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * Mint the `amount` of tokens for the `to` account
     *
     * Emits a Transfer event.
     */
    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Receipient needs to be different zero address");

        _totalSupply += amount;
        _balances[to] += amount;

        // Overflow checks
        require(_balances[to] >= amount && _totalSupply >= amount);

        emit Transfer(address(0), to, amount);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * Return the amount of tokens of the specific account
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

}