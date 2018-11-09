let express = require('express');
let app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const geth = require('./geth')
let cors = require('cors')
let { abi, bin } = require('./contractABI')
let web3 = require('./web3')

let path = '';

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router = express.Router();

router.get('/contract', function (req, res) {
    res.status(200).send({
        message: 'OK',
        bin: bin,
        abi: abi
    })
})

router.post('/geth', function (req, res) {
    let config = req.body.config;
    if (req.body.request == "create") {
        console.log(config.datadir)
        let message = geth.createBlockchain(config);
        console.log(message)
        res.status(200).send({
            message: message
        })
    } else if (req.body.request == "connect") {
        let message = geth.connectToBlockchain(config);
        res.status(200).send({
            message: message
        })
    }
})

router.post('/web3', function (req, res) {
    let datadir = req.body;
    console.log(datadir)
    // let account = web3.setIpcProvider(datadir)
    // res.status(200).send({
    //     message: 'OK',
    //     account: account
    // })
})

app.use('/api', router)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

