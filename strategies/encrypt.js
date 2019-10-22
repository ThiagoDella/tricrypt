const chalk = require('chalk');
const strategy = require('./strategy');

function encryptStrategy(input, output, cipher) {
  console.log('\n\n\t' + chalk.white.bgCyan.bold('File') + ' identified, applying ' + chalk.white.bgCyan.bold('Encrypting...'));
  strategy(input, output, cipher, 'encrypt');
}


function init (input, output, cipher) {
  return new encryptStrategy(input, output, cipher);
}

module.exports = init;