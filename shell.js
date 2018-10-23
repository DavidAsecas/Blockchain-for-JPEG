const fs = require('fs');
const geth = require('geth')

// shell.exec('geth --datadir /home/david/Documentos/tfg/ init genesis.json', { async: true }, () => {
//     let { stdout, stderr, code } = shell
//     .exec('geth --networkid 1114 --rpc --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi "eth,net,web3,personal" --datadir /home/david/Documentos/tfg/ console 2>> eth.log',
//     { async: true})
// });

let config = {
    networkid: "1114",
    port: 30303,
    rpcport: 8545,
    mine: null,
    datadir: "/home/david/Documentos/tfg/",
    rpcapi: "eth,net,web3,personal"
};
createGenesisBlock('1114', 400, 9999999).then(() => geth.start(config, () => console.log('Geth initiated!')))

function createGenesisBlock(chainId, difficulty, gasLimit) {
    let genesis = {
        "config":
        {
            "chainId": chainId,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0,
            "byzantiumBlock": 0
        },
        "difficulty": difficulty,
        "gasLimit": gasLimit,
        "alloc": {}
    };

    let genesisBlock = JSON.stringify(genesis, null, 3);
    fs.writeFile("genesis.json", genesisBlock);
    return new Promise((resolve, reject) => {
        console.log("Genesis block created!")
        resolve();
    });
}
