const Web3 = require('web3');
// const Personal = require('web3-eth-personal')

class Blockchain {

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        // web3admin.extend(this.web3);
        // this.personal = new Personal(this.web3.currentProvider)
    }

    createAccount(password) {
        this.personal.newAccount(password).then((result) => {
            console.log(result)
        }).catch((err) => {

        });
        return new Promise((resolve) => {
            resolve(this.getAccounts())
        })
    }

    getAccounts() {
        return this.web3.eth.accounts
    }

    isMining() {
        return this.web3.eth.mining
    }

    getLengthChain() {
        return this.web3.eth.blocknumber
    }

    blocks() {
        this.web3.eth.getBlock(0, false, (err, res) => console.log(res))
    }
}

// let bch = new Blockchain();
// bch.web3.eth.personal.newAccount("12345")
//     .then((account) => {
//         console.log(account);
//         return bch.web3.eth.personal.unlockAccount(account, "12345");
//     })
//     .then(console.log("Account unlocked!"))
//     .catch((error) => console.error(error));

// let promises = []
// bch.web3.eth.getAccounts()
//     .then(accounts => {
//         console.log(accounts)
//         for (let account of accounts) {
//             promises.push(bch.web3.eth.getBalance(account))
//         }
//         Promise.all(promises)
//         .then(values => console.log(values))
//         return
//     }) 





