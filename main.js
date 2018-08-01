#!/usr/bin/env node
const chalk = require('chalk');
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('encrypt', 'encrypts a file or folder')
    .example('$0 encrypt -i ./path/to/an/input -o ./path/to/an/output -r')
    .alias('i', 'input')
    .nargs('i', 1)
    .describe('i', 'A path to a file or folder')
    .demandOption(['i'])
    .alias('o', 'output')
    .nargs('o', 1)
    .describe('o', 'A path to a folder where the \n encrypted output will be saved')
    .demandOption(['o'])
    .boolean('r')
    .alias('r', 'recursive')
    .describe('r', 'If your input is a folder,\n the flag -r should be provided')
    .help('h')
    .alias('h', 'help')
    .epilog('LICENSE - MIT')
    .argv;

const singleFileStrategy = require('./strategies/singleFile');

const input = argv.i || argv.input;
const output = argv.o || argv.output;
const recursive = argv.r || argv.recursive

console.log('\n\n' + chalk.white.bold(' Welcome to tricrypt ;) '));


// Dealing with a single file
if (!recursive) {
  console.log('\n\n' + chalk.white.bgCyan.bold('File') + ' identified, applying ' + chalk.white.bgCyan.bold('single file strategy'));
  singleFileStrategy(input, output);
  
}
