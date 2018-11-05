const fs = require('fs');
const solc = require('solc');
const path = require('path');

var input = {
    'Jpeg.sol': fs.readFileSync(path.join(__dirname, './contract/Jpeg.sol'), 'utf8'),
};

let compiled = solc.compile({ sources: input });

bin = compiled.contracts['Jpeg.sol:Jpeg'].bytecode;

const abi = compiled.contracts['Jpeg.sol:Jpeg'].interface;

module.exports = { abi, bin } 