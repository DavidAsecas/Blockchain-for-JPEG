let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const geth = require('./geth')
let cors = require('cors')
let web3 = require('./web3')

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router = express.Router();

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
    let request = req.body.request;
    let data = req.body.data
    if (request == "setWeb3") {
        web3.setWeb3(data)
            .then(address => {
                res.status(200).send({
                    address: address
                })
            })
    } else if (request == "upload") {
        web3.uploadImage(data)
            .then((contract) => {
                res.status(200).send({
                    id: data
                })
            })
    }


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

