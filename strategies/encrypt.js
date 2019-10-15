const chalk = require('chalk');
const singleFileStrategy = require('./singleFile');

function encryptStrategy(input, output, cipher) {
  console.log('\n\n\t' + chalk.white.bgCyan.bold('File') + ' identified, applying ' + chalk.white.bgCyan.bold('Encrypting...'));
  singleFileStrategy(input, output, cipher, 'encrypt');
}


function init (input, output, cipher, recursive) {
  return new encryptStrategy(input, output, cipher);
}

module.exports = init;