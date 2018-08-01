const fs = require('fs');
const path = require('path');
function singleFileStrategy (input, output) {
  if (!input || !output) 
    throw new Error('Please provide an input path and an output path');
  else {
    const parsedInput = normalizePath(input);
    const inputExists = checkFile(parsedInput);
    
  }
};

function normalizePath(input) {
  let relativePath = path.normalize(input);
  return relativePath;
}

function checkFile (input) {
  fs.stat(input, (error, stats) => {
    const isFile = stats.isFile();
    return isFile;
  });
}

module.exports = {
  singleFileStrategy,
  normalizePath,
};