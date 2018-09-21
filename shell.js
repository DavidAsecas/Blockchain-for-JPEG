let shell = require('shelljs');
let fs = require('fs');

createGenesisBlock(1114, "400", "9999999").then(() => {
    shell.exec('geth --datadir /home/david/Documentos/tfg/ init genesis.json', { async: true })
})

function createGenesisBlock(chainId, difficulty, gasLimit) {
    let genesis = {
        "config":
            {
                "chainId": chainId,
                "homesteadBlock": 0,
                "eip155Block": 0,
                "eip158Block": 0,
                "byzantiumBlock": 0
            }
        , "difficulty": difficulty,
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