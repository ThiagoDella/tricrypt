const chalk = require('chalk');
const singleFileStrategy = require('./singleFile');

function decryptStrategy(input, output, cipher, recursive) {
  // Dealing with a single file
  if (!recursive) {
    console.log('\n\n\t' + chalk.white.bgCyan.bold('File') + ' identified, applying ' + chalk.white.bgCyan.bold('single file strategy'));
    singleFileStrategy(input, output, cipher, 'decrypt');  
  }
}


function init (input, output, cipher, recursive) {
  return new decryptStrategy(input, output, cipher, recursive);
}

module.exports = init;