const Web3 = require('web3')
const net = require('net')
let web3

module.exports.setIpcProvider = function (datadir) {
    let account
    web3 = new Web3(new Web3.providers.IpcProvider(datadir, net))
    web3.eth.personal.newAccount('11111').then(res => account = res)
    return account
}