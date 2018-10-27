let express = require('express');
let app = express();
const fs = require('fs');
const geth = require('geth');

let config = {
    networkid: "1114",
    port: 30303,
    rpcport: 8545,
    mine: null,
    datadir: "/home/david/Documentos/tfg/test",
    rpcapi: "eth,net,web3,personal"
};

app.get('/', function (req, res) {
    createGenesisBlock('1114', 400, 9999999).then(() => {
        gethInit(config)
    }
)});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function gethInit(conf) {
    geth.start(conf, () => console.log('Geth initiated!'));
}

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