const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const chalk = require('chalk');

function tricrypt (method, cipher) {
  this.method = method;
  this.cipher = crypto.createHash('sha256').update(cipher).digest('base64').substr(0, 32);
  this.iv = new Buffer(crypto.randomBytes(16)).toString('hex').substr(0, 16);
};

tricrypt.prototype.encryptFile = function (input, output, fileName) {
  let rs;
  let ws;
  const baseName = fileName.split('.')[0];
  const mimetype = mime.lookup(fileName);
  const extension = mime.extension(mimetype);  
  const encMethod = crypto.createCipheriv(this.method, this.cipher, this.iv);
  const destination = path.join(output, baseName + '.tricrypt.' + extension)
  
  try {
    rs = fs.createReadStream(input);
    ws = fs.createWriteStream(destination);     
  } catch (error) {
    console.log('\n\n\t' + chalk.white.bgRed.bold('Error while trying creating streams'));
    console.log('\n\n\t' + error);    
  }
  ws.write(this.iv + '===tricrypt===');
  rs.pipe(encMethod).pipe(ws);
  return destination;
};

tricrypt.prototype.decryptFile = function (input, output, fileName) {
  let rs;
  let ws;
  const baseName = fileName.split('.')[0];
  const mimetype = mime.lookup(fileName);
  const extension = mime.extension(mimetype);  
  
  try {
    rs = fs.createReadStream(input, {start: 0, end: 15, });
    ws = fs.createWriteStream(path.join(output, baseName + '.decrypted.' + extension));     
  } catch (error) {
    console.log('\n\n\t' + chalk.white.bgRed.bold('Error while trying creating streams'));
    console.log('\n\n\t' + error);    
  }
  rs.on('data', (data) => {
    const iv = data;
    this.decMethod = crypto.createDecipheriv(this.method, this.cipher, iv);
    const originalrs = fs.createReadStream(input, {start: 30});
    originalrs.pipe(this.decMethod).pipe(ws);
  })
};

function init (method, cipher) {
  return new tricrypt(method, cipher);
}

module.exports = init;