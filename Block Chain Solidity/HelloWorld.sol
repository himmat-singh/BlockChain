pragma solidity ^0.4.24;

contract HelloWorld{
    bytes32 message;
    function HelloWorld(bytes32 myMessage){
        message=myMessage;
    }

    function getMessage() returns(bytes32){
        return message;
    }
}