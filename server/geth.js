let cp = require('child_process');

function start(config) {
    let args = []
    for (conf in config) {
        args.push('--' + conf);
        args.push(config[conf]);
    }
    let flags = args.filter(value => value != '');
    console.log(flags)
    cp.spawn('geth', flags, { stdio: 'ignore' });
}

module.exports.start = start;