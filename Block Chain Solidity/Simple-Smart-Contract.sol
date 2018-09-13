pragma solidity ^0.4.24;

contract SimpleStorage{
    uint storeData;

    function set(uint x) public{
        storeData=x;
    }

    function get() public view returns (uint){
        return storeData;
    }
}