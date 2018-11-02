const cp = require('child_process');
const keythereum = require('keythereum');

module.exports.start = function (config) {
    let args = []
    for (conf in config) {
        args.push('--' + conf);
        args.push(config[conf]);
    }
    let flags = args.filter(value => value != '');
    console.log(flags)
    cp.spawn('geth', flags, { stdio: 'ignore' });
}

module.exports.createAddress = function () {
    let dk = keythereum.create();
    let address = keythereum.privateKeyToAddress(dk.privateKey);
    console.log("public address:" + address);
    console.log("private key in hex:" + dk.privateKey.toString('hex'));
}
