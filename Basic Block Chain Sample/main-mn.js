const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }
}


class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nonce).toString();
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
        this.diffculty=2;
        this.pendingTransactions = [];
        this.miningReward=100;
    }

    createGenesisBlock(){
        return new Block('01-01-2000','Genesis Block','0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransaction(miningRewardAddress){
        let block = new Block(Date.UTC(),this.pendingTransactions);
        block.mineBlock(this.diffculty);

        console.log('Block sucessfully mined!');
        this.chain.push(block);

        this.pendingTransactions=[
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance=0;
        for (const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress=== address){
                    balance-=trans.amount;
                }

                if(trans.toAddress === address){
                    balance +=trans.amount;
                }

            }
        }

        return balance;
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
myChain.createTransaction('addresse1', 'addresse2',5);

console.log('mining block 2...');
myChain.createTransaction('addresse2', 'addresse1',3);

console.log('\n Starting the miner...');
myChain.minePendingTransaction('minerAddress');

console.log('\n Balance of the miner: '+ myChain.getBalanceOfAddress('minerAddress'));


console.log('\n Starting the miner again...');
myChain.minePendingTransaction('minerAddress');

console.log('\n Balance of the miner: '+ myChain.getBalanceOfAddress('minerAddress'));