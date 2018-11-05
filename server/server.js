let express = require('express');
let app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const geth = require('./geth')
const cors = require('cors')
let { abi, bin } = require('./contractABI')

let path = '';

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.all("*", function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
// });

app.post('/', function (req, res) {
    let config = req.body;
    path = config.datadir;
    createGenesisBlock(config.networkid, 400, 9999999)
        .then(() => {
            let address = geth.start(config);
            res.status(200).send({
                message: 'Geth initiated!',
                address: address
            })
        })
});

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'OK',
        bin: bin,
        abi: abi
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

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
    fs.mkdir(path, () => {
        fs.writeFile(path + "/genesis.json", genesisBlock);
    });
    return new Promise((resolve, reject) => {
        console.log("Genesis block created!")
        resolve();
    });
}