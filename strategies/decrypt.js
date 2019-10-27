const chalk = require('chalk');
const strategy = require('./strategy');

function decryptStrategy(input, output, cipher) {
    console.log('\n\n\t' + chalk.white.bgCyan.bold('Path') + ' identified. Now  ' + chalk.white.bgCyan.bold('decrypting...'));
    strategy(input, output, cipher, 'decrypt');  
}


function init (input, output, cipher) {
  return new decryptStrategy(input, output, cipher);
}

module.exports = init;