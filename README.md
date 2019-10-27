# tricrypt
A command-line file encrypt tool made using [Node.js](https://nodejs.org/en/)

> **Note:** this project still a work in progress

## Actual state of this work
- [x] Encrypt a single file
- [x] Decrypt a single file
- [x] Encrypt a folder
- [x] Decrypt a folder

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

Tricrypt has the capability to encrypt and decrypt folders. For encrypting/decrypting the folder the usage is
the same as above. Tricrypt encrypts all the files in a folder and outputs the compressed zip of the encrypted files
in the desired output directory. Decryption works the same way, you could either provide a zip or the unzipped folder.
