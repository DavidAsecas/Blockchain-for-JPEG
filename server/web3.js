const Web3 = require('web3')
const net = require('net')
const { abi, bin } = require('./contractABI')

let web3;

module.exports.setWeb3 = function (ipcpath) {
    console.log(ipcpath)
    web3 = new Web3(new Web3.providers.IpcProvider(ipcpath, net))
    web3.extend({
        property: 'miner',
        methods: [{
            name: 'start',
            call: 'miner_start',
            params: 1
        },
        {
            name: 'stop',
            call: 'miner_stop'
        }]
    })
    web3.miner.start(1);
    return web3.eth.personal.newAccount('11111')
}

module.exports.uploadImage = function (data) {
    let contract = new web3.eth.Contract(JSON.parse(abi));
    let account;
    web3.eth.getAccounts().then(accounts => account = accounts[0])
    console.log(data)
    return web3.eth.personal.unlockAccount(data.account, '11111', 600)
        .then(() => {
            return contract.deploy({
                data: '0x' + bin,
                arguments: [data.id]
            })
                .send({
                    from: data.account,
                    gas: 3141592,
                    gasPrice: '300000'
                })
                // .estimateGas({
                //     from: data.account
                // })
                // .then(console.log)
        })
}