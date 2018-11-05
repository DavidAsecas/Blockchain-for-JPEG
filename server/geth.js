const cp = require('child_process');
const keythereum = require('keythereum');

module.exports.start = function (config) {
    let args = []
    for (conf in config) {
        args.push('--' + conf);
        args.push(config[conf]);
    }
    let flags = args.filter(value => value != '');
    let address = this.createAddress();
    flags.push(address);
    console.log(config.datadir)
    cp.spawn('geth', ['init', config.datadir + '/genesis.json'], { stdio: 'inherit' });
    // cp.spawn('geth', flags, { stdio: 'inherit' });
    return address;
}

module.exports.createAddress = function () {
    let dk = keythereum.create();
    let address = keythereum.privateKeyToAddress(dk.privateKey);
    return address;
}
