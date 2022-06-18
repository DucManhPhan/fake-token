// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract FakeToken {

    string private _name = "Fake Token";

    string private _symbol = "FT";

    uint8 private _totalSupply;

    address private _owner;

    /**
     * Save the amount of tokens that is corresponding the specific address.
     */
    mapping (address => uint8) private _balances;

    event Transfer(address indexed from, address indexed to, uint value);

    constructor() {
        _owner = msg.sender;

        uint8 capacity = 200;
        _mint(_owner, capacity);
    }

    /**
     * Move `amount` tokens from the caller's account to `to` account.
     * 
     * Returns a boolean value indicating whether the operation succeeded.
     * Emits a Transfer event.
     */
    function transfer(address to, uint8 amount) public returns (bool) {
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
    function _mint(address to, uint8 amount) internal {
        require(to != address(0), "Receipient needs to be different zero address");

        _totalSupply += amount;
        _balances[to] += amount;

        // Overflow checks
        require(_balances[to] >= amount && _totalSupply >= amount, "Happened overflow ");

        emit Transfer(address(0), to, amount);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint8) {
        return _totalSupply;
    }

    /**
     * Return the amount of tokens of the specific account
     */
    function balanceOf(address account) public view returns (uint8) {
        return _balances[account];
    }

}