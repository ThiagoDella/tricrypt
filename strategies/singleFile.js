const fs = require('fs');
const path_mod = require('path');
const tricrypt = require('../tricrypt/tricrypt');
const readdirp = require('readdirp');


function singleFileStrategy(input, output, cipher, command) {
  if (!input || !output)
    throw new Error('Please provide an input path and an output path');
  else {
    const parsedInput = normalizePath(input);
    const parsedOutput = normalizePath(output);

    const inputIsFile = this.checkFile(parsedInput);
    const inputIsDir = this.checkDir(parsedInput);

    const outputExists = this.checkDir(parsedOutput);

    if (inputIsFile && outputExists && command === 'encrypt') {
      const fileName = path_mod.basename(parsedInput);
      let enc = tricrypt('aes-256-cbc', cipher);
      enc.encryptFile(input, output, fileName);
    }
    else if (inputIsFile && outputExists && command === 'decrypt') {
      const fileName = path_mod.basename(parsedInput);
      let dec = tricrypt('aes-256-cbc', cipher);
      dec.decryptFile(input, output, fileName);
    }
    else if (inputIsDir && outputExists && command === 'encrypt') {
      let enc = tricrypt('aes-256-cbc', cipher);
      readdirp(parsedInput, { alwaysStat: true })
      .on('data', (entry) => {
        const { path } = entry;
        const fileName = path_mod.basename(normalizePath(path));
        enc.encryptFile(path_mod.join(parsedInput, fileName), parsedOutput, fileName)
      })
    }
    else if (inputIsDir && outputExists && command === 'decrypt') {
      let dec = tricrypt('aes-256-cbc', cipher);
      readdirp(parsedInput, { alwaysStat: true })
      .on('data', (entry) => {
        const { path } = entry;
        const fileName = path_mod.basename(normalizePath(path));
        dec.decryptFile(path_mod.join(parsedInput, fileName), parsedOutput, fileName)
      })
    }
    else {
      throw new Error('Input not found.');
    }

  }
};

singleFileStrategy.prototype.normalizePath = function(input) {
  let relativePath = path_mod.normalize(input);
  return relativePath;
};

singleFileStrategy.prototype.checkFile = function (input) {
  return fs.statSync(input).isFile();
};

singleFileStrategy.prototype.checkDir = function (path) {
  return fs.statSync(path).isDirectory();
};

function init(input, output, cipher, command) {
  return new singleFileStrategy(input, output, cipher, command);
}

module.exports = init;