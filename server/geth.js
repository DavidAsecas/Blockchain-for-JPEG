const cp = require('child_process');
const fs = require('fs');

module.exports.createBlockchain = function (config) {
    let networkid = config.networkid;
    let datadir = config.datadir;
    createGenesisBlock(networkid, datadir).then(() => {
        cp.spawn('geth', ['--datadir', config.datadir, 'init', config.datadir + '/genesis.json'], {
            stdio: 'inherit'
        })
    })
    return "Blockchain created";
}

module.exports.connectToBlockchain = function (config) {
    let flags = parseFlags(config);
    let child = cp.spawn('geth', flags, { stdio: ['inherit', 'inherit', 'pipe'] })
    return new Promise((resolve, reject) => {
        child.stderr.setEncoding('utf8');
        child.stderr.on('data', data => {
            let buffer = new Buffer(data)
            let matches = buffer.toString().match(/IPC endpoint opened/g)
            console.log(buffer.toString())
            if (matches != null) {
                resolve("Connected to blockchain")
            }
        })
    })
}

function ipcIsOpened() {
    return new Promise((resolve, reject) => {
        cp.stderr.setEncoding('utf8');
        cp.stderr.on('data', data => {
            let buffer = new Buffer(data)
            let matches = buffer.toString().match(/IPC endpoint opened/g)
            if (matches != null) {
                resolve(true)
            }
        })
    })
}

function parseFlags(config) {
    let args = []
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
        "difficulty": "0x190",
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
        resolve();
    });
}