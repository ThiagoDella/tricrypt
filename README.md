# tricrypt
A command-line file encrypt tool made using [Node.js](https://nodejs.org/en/)

> **Note:** this project still a work in progress

## Actual state of this work
- [x] Encrypt a single file
- [x] Decrypt a single file
- [ ] Encrypt a folder
- [ ] Decrypt a folder

## Using tricrypt
 1. Download this source code
 2. Install its dependencies
```bash
  npm install
```
 3. Tricrypt takes one of two commands: encrypt or decrypt
 ```bash
 $ node main.js encrypt [options]
 $ node main.js decrypt [options]
 ```

 ### encrypt [options]
 Option | alias | description
------------ | ------------- | -------------
input | i | a path to an input file 
ouput | o | a path to an output folder
password | p | a password to be used as a cipher

#### usage
```bash
$ node main.js encrypt -i ~path/to/a/file.txt -o ~path/to/a/folder -p mypassword
```

 ### decrypt [options]
 Option | alias | description
------------ | ------------- | -------------
input | i | a path to an input file 
ouput | o | a path to an output folder
password | p | a password to be used as a cipher

#### usage
```bash
$ node main.js decrypt -i ~path/to/a/file.tricrypt.txt -o ~path/to/a/folder -p mypassword
```
