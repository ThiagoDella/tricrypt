const chalk = require('chalk');
const strategy = require('./strategy');

function encryptStrategy(input, output, cipher) {
  console.log('\n\n\t' + chalk.white.bgCyan.bold('Path') + ' identified. Now ' + chalk.white.bgCyan.bold('encrypting...'));
  strategy(input, output, cipher, 'encrypt');
}


function init (input, output, cipher) {
  return new encryptStrategy(input, output, cipher);
}

module.exports = init;