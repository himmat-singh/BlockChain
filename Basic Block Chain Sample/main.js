const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(diffculty){
        while(this.hash.substring(0,diffculty)!== Array(diffculty+1).join('0')){
            this.nonce++;
            this.hash=this.calculateHash();
        }

        console.log('Block mined: '+this.hash);
    }

}

class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.diffculty=6;
    }

    createGenesisBlock(){
        return new Block(0,'01-01-2000','Genesis Block','0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diffculty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash())
                return false;

            if(currentBlock.previousHash !== previousBlock.hash)
                return false;
        }

        return true;
    }
}


let myChain = new BlockChain();
console.log('mining block 1...');
myChain.addBlock(new Block(1,'01-02-2000',{amount:5}));

console.log('mining block 2...');
myChain.addBlock(new Block(2,'01-03-2000',{amount:10}));

console.log('mining block 3...');
myChain.addBlock(new Block(3,'01-04-2000',{amount:15}));

//console.log(JSON.stringify(myChain,null,4));

//console.log('Is my chain valid? '+myChain.isChainValid());

//myChain.chain[1].data={amount : 200};


//console.log('Retry to verify Is my chain valid? '+myChain.isChainValid());