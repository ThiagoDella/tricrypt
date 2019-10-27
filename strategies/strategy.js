const fs = require('fs');
const path_mod = require('path');
const tricrypt = require('../tricrypt/tricrypt');
const readdirp = require('readdirp');
const archiver = require('archiver');
const mime = require('mime-types');
const unzipper = require('unzipper');


function strategy(input, output, cipher, command) {
  if (!input || !output)
    throw new Error('Please provide an input path and an output path');
  else {
    const parsedInput = this.normalizePath(input);
    const parsedOutput = this.normalizePath(output);

    const inputIsFile = this.checkFile(parsedInput);
    const inputIsDir = this.checkDir(parsedInput);

    const outputExists = this.checkDir(parsedOutput);
    const isCompressed = parsedInput.indexOf('.zip') >= 0;


    if (inputIsFile && outputExists && command === 'encrypt') {
      const fileName = path_mod.basename(parsedInput);
      let enc = tricrypt('aes-256-cbc', cipher);
      enc.encryptFile(input, output, fileName);
    }
    else if ((inputIsFile && !isCompressed) && outputExists && command === 'decrypt') {
      const fileName = path_mod.basename(parsedInput);
      let dec = tricrypt('aes-256-cbc', cipher);
      dec.decryptFile(input, output, fileName);
    }
    else if (inputIsDir && outputExists && command === 'encrypt') {
      let enc = tricrypt('aes-256-cbc', cipher);
      let destinationNames = [];
      const basename = path_mod.basename(parsedOutput);
      const suffix = basename ? '.tricrypt.zip' : 'tricrypt.zip';
      const zippedOutput = fs.createWriteStream(path_mod.join(parsedOutput, basename + suffix));

      readdirp(parsedInput, { alwaysStat: true })
        .on('data', (entry) => {
          const { path } = entry;
          const fileName = path_mod.basename(this.normalizePath(path));
          destination = enc.encryptFile(path_mod.join(parsedInput, fileName), parsedOutput, fileName);
          destinationNames.push(destination);
        })
        .on('end', () => {
          // After all files have been encrypted, zip them together
          var archive = archiver('zip', {
            zlib: { level: 9 }
          });
          archive.pipe(zippedOutput);

          destinationNames.forEach((value, index) => {
            const destName = path_mod.basename(this.normalizePath(value));
            const mimetype = mime.lookup(destName);
            const extension = mime.extension(mimetype);
            archive.file(value, { name: 'tricrypt-' + 'encrypted-' + (index + 1) + '.' + extension });
          });

          archive.finalize();
        });

      // Once the output is zipped, delete the remaining files
      zippedOutput.on('close', () => {
        destinationNames.forEach((value, _) => {
          fs.unlinkSync(value);
        });
      });
    }
    else if ((inputIsDir || isCompressed) && outputExists && command === 'decrypt') {
      const fileName = path_mod.basename(parsedInput);
      let outputFolder;
      let dec = tricrypt('aes-256-cbc', cipher);

      if (isCompressed) {
        outputFolder = parsedOutput + fileName.substring(0, fileName.indexOf('.zip')) + '.source';
        fs.createReadStream(parsedInput).pipe(unzipper.Extract({ path: outputFolder })
          .on('close', () => {
            readdirp(outputFolder, { alwaysStat: true })
              .on('data', (entry) => {
                const { path } = entry;
                const fileName = path_mod.basename(this.normalizePath(path));
                const decryptFilePath = path_mod.join(outputFolder, fileName);
                dec.decryptFile(decryptFilePath, parsedOutput, fileName);
              })
          }));
        return;
      }

      readdirp(parsedInput, { alwaysStat: true })
        .on('data', (entry) => {
          const { path } = entry;
          const fileName = path_mod.basename(this.normalizePath(path));
          dec.decryptFile(path_mod.join(parsedInput, fileName), parsedOutput, fileName)
        })
    }
    else {
      throw new Error('Input not found.');
    }

  }
};

strategy.prototype.normalizePath = function (input) {
  let relativePath = path_mod.normalize(input);
  return relativePath;
};

strategy.prototype.checkFile = function (input) {
  return fs.statSync(input).isFile();
};

strategy.prototype.checkDir = function (path) {
  return fs.statSync(path).isDirectory();
};

function init(input, output, cipher, command) {
  return new strategy(input, output, cipher, command);
}

module.exports = init;