const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const chalk = require('chalk');

function tricrypt (method, cipher) {
  this.method = method;
  this.cipher = cipher;
  this.encMethod = crypto.createCipher(this.method, this.cipher);
  this.decMethod = crypto.createDecipher(this.method, this.cipher);
};

tricrypt.prototype.encryptFile = function (input, output, fileName) {
  let rs;
  let ws;
  const baseName = fileName.split('.')[0];
  const mimetype = mime.lookup(fileName);
  const extension = mime.extension(mimetype);  
  
  try {
    rs = fs.createReadStream(input);
    ws = fs.createWriteStream(path.join(output, baseName + '.tricrypt.' + extension));     
  } catch (error) {
    console.log('\n\n\t' + chalk.white.bgRed.bold('Error while trying creating streams'));
    console.log('\n\n\t' + error);    
  }
  rs.pipe(this.encMethod).pipe(ws);  
};

tricrypt.prototype.decryptFile = function (input, output, fileName) {
  let rs;
  let ws;
  const baseName = fileName.split('.')[0];
  const mimetype = mime.lookup(fileName);
  const extension = mime.extension(mimetype);  
  
  try {
    rs = fs.createReadStream(input);
    ws = fs.createWriteStream(path.join(output, baseName + '.decrypted.' + extension));     
  } catch (error) {
    console.log('\n\n\t' + chalk.white.bgRed.bold('Error while trying creating streams'));
    console.log('\n\n\t' + error);    
  }
  rs.pipe(this.decMethod).pipe(ws);  
};

function init (method, cipher) {
  return new tricrypt(method, cipher);
}


module.exports = init;