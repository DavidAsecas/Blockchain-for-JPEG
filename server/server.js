let express = require('express');
let app = express();
const fs = require('fs');
const geth = require('geth');
const bodyParser = require('body-parser');

app.use(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use(bodyParser.json());

app.get('/', function (req, res) {

    console.log('SIIII')
});



app.post('/', function (req, res) {
    console.log(req.body);
    res.send(req.body);
    // createGenesisBlock('1114', 400, 9999999).then(() => {
    //     gethInit(config)
    // })
});

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