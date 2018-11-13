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
        let message = geth.createBlockchain(config);
        res.status(200).send({
            message: message
        })
    } else if (req.body.request == "connect") {
        geth.connectToBlockchain(config)
            .then(message => {
                res.status(200).send({
                    message: message
                })
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
        web3.uploadId(data)
            .then(contract => {
                res.status(200).send({
                    id: data
                })
            })
    }
})

router.get('/web3', function (req, res) {
    web3.getId()
        .then(id => {
            res.status(200).send({
                id: id
            })
        })

})

app.use('/api', router)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

