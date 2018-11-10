const cp = require('child_process');
const keythereum = require('keythereum');
const fs = require('fs');

module.exports.createBlockchain = function (config) {
    console.log(config)
    let networkid = config.networkid;
    let datadir = config.datadir;
    createGenesisBlock(networkid, datadir).then(() => {
        cp.spawn('geth', ['--datadir', config.datadir, 'init', config.datadir + '/genesis.json'], {
            stdio: 'inherit'
        })
    })
    return "Blockchain created"
}

module.exports.connectToBlockchain = function (config) {
    let flags = parseFlags(config);
    cp.spawn('geth', flags, { stdio: 'inherit' })
    return "Connected to blockchain";
}

function createAddress() {
    let dk = keythereum.create();
    let address = keythereum.privateKeyToAddress(dk.privateKey);
    return address;
}

function parseFlags(config) {
    let args = []
    console.log(config.datadir + '/' + config.ipcpath)
    for (conf in config) {
        args.push('--' + conf);
        args.push(config[conf]);
    }
    let flags = args.filter(value => value != '');
    return flags;
}

function createGenesisBlock(chainId, datadir) {
    let genesis = {
        "config":
        {
            "chainId": chainId,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0,
            "byzantiumBlock": 0
        },
        "alloc": {},
        "coinbase": "0x0000000000000000000000000000000000000000",
        "difficulty": "0x20000",
        "extraData": "",
        "gasLimit": "0x2fefd8",
        "nonce": "0x0000000000000042",
        "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": "0x00"
    };

    let genesisBlock = JSON.stringify(genesis, null, 3);
    fs.mkdir(datadir, () => {
        fs.writeFile(datadir + "/genesis.json", genesisBlock);
    });
    return new Promise((resolve, reject) => {
        console.log("Genesis block created!")
        resolve();
    });
}

