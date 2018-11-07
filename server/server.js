let express = require('express');
let app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const geth = require('./geth')
let cors = require('cors')
let { abi, bin } = require('./contractABI')
let web3 = require('./w3b')

let path = '';

// app.use(cors())
// app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let router = express.Router();

router.get('/contract', function (req, res) {
    res.status(200).send({
        message: 'OK',
        bin: bin,
        abi: abi
    })
})

router.post('/geth', function (req, res) {
    let config = req.body;
    console.log(config)
    path = config.datadir;
    createGenesisBlock(config.networkid)
        .then(() => {
            let address = geth.start(config);
            res.status(200).send({
                message: 'Geth initiated!',
                address: address
            })
        })
})

router.post('/web3', function (req, res) {
    let datadir = req.body;
    let account = web3.setIpcProvider(datadir)
    res.status(200).send({
        message: 'OK',
        account: account
    })
})

// app.post('/geth', function (req, res) {
//     let config = req.body;
//     path = config.datadir;
//     createGenesisBlock(config.networkid)
//         .then(() => {
//             let address = geth.start(config);
//             res.status(200).send({
//                 message: 'Geth initiated!',
//                 address: address
//             })
//         })
// });

// app.get('/contract', function (req, res) {
//     res.status(200).send({
//         message: 'OK',
//         bin: bin,
//         abi: abi
//     })
// })

// app.post('/web3', function (req, res) {
//     let datadir = req.body;
//     let account = web3.setIpcProvider(datadir)
//     res.status(200).send({
//         message: 'OK',
//         account: account
//     })
// })
app.use('/api', router)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function createGenesisBlock(chainId) {
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
    fs.mkdir(path, () => {
        fs.writeFile(path + "/genesis.json", genesisBlock);
    });
    return new Promise((resolve, reject) => {
        console.log("Genesis block created!")
        resolve();
    });
}