const Web3 = require('web3');
const web3admin = require('web3admin');
const Personal = require('web3-eth-personal')


class Blockchain {

    constructor(){
       this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
       web3admin.extend(this.web3);
       this.personal = new Personal(this.web3.currentProvider)
    }

    createAccount(password) {
        this.personal.newAccount(password).then((result) => {
            console.log(result)
        }).catch((err) => {
            
        });;
        return new Promise((resolve) => {
            resolve(this.getAccounts())
        })
    }

    getAccounts() {
        return this.web3.eth.accounts
    }
}

let blockchain = new Blockchain();
blockchain.createAccount('111').then(accounts => console.log(accounts))

