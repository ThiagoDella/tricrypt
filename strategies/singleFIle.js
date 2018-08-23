const fs = require('fs');
const path = require('path');
const tricrypt = require('../tricrypt/tricrypt');

function singleFileStrategy (input, output, cipher, command) {
  if (!input || !output) 
    throw new Error('Please provide an input path and an output path');
  else {
    const parsedInput = this.normalizePath(input);
    const parsedOutput = this.normalizePath(output);

    const inputExists = this.checkFile(parsedInput);
    const outputExists = this.checkDir(parsedOutput);

    const fileName = path.basename(parsedInput);
    
    if (inputExists && outputExists && command === 'encrypt') {
      let enc = tricrypt('aes-256-cbc', cipher);
      enc.encryptFile(input, output, fileName);      
    } 
    else if (inputExists && outputExists && command === 'decrypt') {
      let dec = tricrypt('aes256', cipher);
      dec.decryptFile(input, output, fileName);      
    } else {
      throw new Error('Input not found.');
    }
    
  }
};

singleFileStrategy.prototype.normalizePath = function(input) {
  let relativePath = path.normalize(input);
  return relativePath;
};

singleFileStrategy.prototype.checkFile = function (input) {
  return fs.statSync(input).isFile();
};

singleFileStrategy.prototype.checkDir = function (path) {
  return fs.statSync(path).isDirectory();
};

function init (input, output, cipher, command) {
  return new singleFileStrategy(input, output, cipher, command);
}

module.exports = init;