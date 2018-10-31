let cp = require('child_process');
let args = [];

function start(config) {
    for (conf in config) {
        args.push('--' + conf.toString() + ' ' + config[conf])
    }
    console.log(args)
    cp.spawn('geth', args, { stdio: 'inherit' });
}

module.exports.start = start;