const Web3 = require('web3')
const net = require('net')
let web3

module.exports.setWeb3 = function (ipcpath) {
    let account
    console.log(ipcpath)
    web3 = new Web3(new Web3.providers.IpcProvider(ipcpath, net))
    return web3.eth.personal.newAccount('11111')
}