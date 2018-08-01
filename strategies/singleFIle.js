const fs = require('fs');
const path = require('path');
function singleFileStrategy (input, output) {
  if (!input || !output) 
    throw new Error('Please provide an input path and an output path');
  else {
    const parsedInput = this.normalizePath(input);
    const inputExists = this.checkFile(parsedInput);
    
    if (inputExists) {
      
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

function init (input, output) {
  return new singleFileStrategy(input, output);
}

module.exports = init;