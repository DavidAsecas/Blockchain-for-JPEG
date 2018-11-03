pragma solidity ^0.4.24;

contract Jpeg {

    string public id;
    
    constructor(string _id) public {
        id = _id;
    }
    
    function setId(string _id) public {
        id = _id;
    }
}