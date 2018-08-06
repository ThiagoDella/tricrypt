#!/usr/bin/env node
const encryptStrategy = require('./strategies/encrypt');
const decryptStrategy = require('./strategies/decrypt');

const chalk = require('chalk');
const argv = require('yargs')
    .usage('Usage: $0 <encrypt> [options]')
    .command('encrypt', 'encrypts a file or folder',  function (yargs) {
      yargs.option('input', {
        alias: 'i',
        demand: true,
        describe: "A path to a file or folder",
        type: "string"
        // default: 'http://yargs.js.org/'
      });
      yargs.option('output', {
        alias: 'o',
        demand: true,
        describe: "A path to a output folder",
        type: "string"
      });
      yargs.option('password', {
        alias: 'p',
        demand: true,
        describe: "Password to be used as cipher",
        type: "string" 
      });
      yargs.option('recursive', {
        alias: 'r',
        demand: false,
        describe: "If present, the program will encrypt\na folder provided as input",
        type: "string"
      });
      return yargs
    }, function(argv) {
        sayWelcome();
        const input = argv.i || argv.input;
        const output = argv.o || argv.output;
        const cipher = argv.p || argv.password;
        const recursive = argv.r || argv.recursive
        encryptStrategy(input, output, cipher, recursive);
    })
    .example('$0 encrypt -i ./path/to/an/input -o ./path/to/an/output -r')    
    .command('decrypt', 'decrypts a file or folder',  function (yargs) {
      yargs.option('input', {
        alias: 'i',
        demand: true,
        describe: "A path to a encrypted file or folder",
        type: "string"
        // default: 'http://yargs.js.org/'
      });
      yargs.option('output', {
        alias: 'o',
        demand: true,
        describe: "A path to a output folder",
        type: "string"
      });
      yargs.option('password', {
        alias: 'p',
        demand: true,
        describe: "Password to be used as decrypt cipher",
        type: "string" 
      });
      yargs.option('recursive', {
        alias: 'r',
        demand: false,
        describe: "If present, the program will encrypt\na folder provided as input",
        type: "string"
      });
      return yargs
    }, function(argv) {
        sayWelcome();
        const input = argv.i || argv.input;
        const output = argv.o || argv.output;
        const cipher = argv.p || argv.password;
        const recursive = argv.r || argv.recursive
        decryptStrategy(input, output, cipher, recursive);
    })
    .example('$0 encrypt -i ./path/to/an/input -o ./path/to/an/output -r')    
    .help('h')
    .alias('h', 'help')
    .epilog('LICENSE - MIT')
    .argv;

function sayWelcome () {
  console.log('\n\n\t' + chalk.white.bold('Welcome to tricrypt ;) '));  
}