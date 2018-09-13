var Web3 = require('web3');

var solc=require('solc');

var web3= new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var compiledContract = solc.compile(fs.readFileSync('./HelloWorld.sol').toString());

var abi = compiledContract.contracts[':HelloWorld'].interface;

var bytecode = compiledContract.contracts[':HelloWorld'].bytecode;

var HelloWorld = new web3.eth.Contract(JSON.parse(abi));

var HelloWorldTx = HelloWorld.deploy({data:bytecode, arguments:[Web3.utils.asciiToHex('Hello')]});

HelloWorldTx.send({from:'0xe3b4a093c116a90bc54eb4b7bc8be234f33fb52b', gas: 1000000})
.then((instance)=> console.log(instance.options.address));


web3.eth.estimateGas(HelloWorldTx).then(console.log);



HelloWorldTx.send({from:'0x766c47583bd5f6842ad81afd5890bbe707c57166', gas:1000000)
.then(console.log);

HelloWorldTx.send({from:'0x766c47583bd5f6842ad81afd5890bbe707c57166', gas: 100000})
.then((instance)=> console.log(instance.options.address));

web3.eth.estimateGas(HelloWorldTx).then(console.log);