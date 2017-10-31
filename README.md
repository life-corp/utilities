# YouMayPlay Utilities

Node helper utilities that make some repetitive tasks a little less tedious.

## Installation

This package is hosted from github, so you should prefix the package name with `life-corp/`:

```sh
$ npm install life-corp/ymp-utilities
```

## Documentation

### `copy(filePaths)`

Takes an array of `{src, dest}` mappings and asynchronously writes the `src` files to the `dest` paths.

`filePaths` - An array of `{src, dest}` mappings.

Returns a promise that is resolved once all the files are copied. Fails if any of the directories don't exist or there is an error during the copy process.

```js
const { copy } = require('ymp-utilities');

copy([
  { src: 'some/source/path.md', dest: 'oh/look/a/destination/path.md' },
  { src: 'another/src/path.md', dest: 'and/another/destination/path.md' },
])]
  .then(() => {
    console.log('all files are copied');
  });
```


#### `mkdirPromise(dirPath, ignoreIfExists)`
*`mkdirp` with a promise API.*

`dirPath` - The directory path to create, also creates any directories along the way that don't exist.

`ignoreIfExists` - Boolean specifying whether to ignore "file exists" errors. Defaults to `true`.

**Returns a promise that resolves when the `dirPath` is created or if it already exists. Rejects on any other error or on "file exists" errors if `ignoreIfExists` is false.**

```js
const { mkdirPromise } = require('ymp-utilities');

mkdirPromise('path/that/does/not/exist')
  .then((pathExists) => mkdirPromise(pathExists))         // File Exists is ignored, resolves
  .then((pathExists) => mkdirPromise(pathExists, false))  // File Exists is not ignored, rejects
  .then(null, (error) => console.log(error));
```


### `mkdirs(dirPaths)`

*Takes an array of directory paths and `mkdirp`s them all.*

`dirPaths` - Array of directory paths to create.

**Returns a promise that resolves when all the directories have been created.**

```js
const { mkdirs } = require('ymp-utilities');

mkdirs(['first/directory/path/to/create', 'second/directory/path/to/create'])
  .then(() => {
    console.log('all directories have been created');
  })
```


### `mountShare(config)`

*Mounts a smbfs share using the given configuration.*

`config.username` - Username used to access the share.

`config.password` - Password used to access the share.

`config.mountPath` - The path on the local machine that we want the share to be accessible from.

`config.sharePath` - The path of the share that is to be mounted. E.g., `<machine>/<drive>` combo.

**Returns a promise that resolves with the mountPath if the path already exists or the path was successfully mounted. Rejects otherwise.**

```js
const { mountShare } = require('ymp-utilities');

mountShare({
  username: 'santa',
  password: 'northpole25',
  mountPath: '/Users/santa/.mount/gifts',
  sharePath: 'giftserver/c'
})
  .then((mountedPath) => {
    console.log(`Mounted the gift server at ${mountedPath}`);
  })
```


### `prompt(text, silent)`

*A wrapper around the `read` utility which prompts the user for input at the command line.*

`text` - The text to display when prompting the user for input.

`silent` - Whether or not to echo out the user's input back to them. Defaults to `false`. This is useful to turn on when the user is typing sensitive information such as a password.

**Returns a promise that resolves with the user's input or rejects with whatever error occurred.**

```js
const { prompt } = require('ymp-utilities');

let creds = {};
prompt('Username: ')
  .then((username) => {
    creds.username = username;
    return prompt('Password: ', true);
  })
  .then((password) => {
    creds.password = password;
    return api.signin(creds);
  })
```


### `walkSync(dir)`

*Recursively traverses a directory and returns the absolute path to each file contained inside it and its subdirectories.*

`dir` - The directory to traverse.

**Returns an array (sometimes nested) of absolute file paths.**

```js
const { walkSync } = require('ymp-utilities');

/**
 * Given the directory tree:
 *  /users/
 *  └── tom/
 *      ├── file1.txt
 *      ├── file2.txt
 *      └── tmp/
 *          └── file3.txt
*/
walkSync('/users/tom') 
// => [ '/users/tom/file1.txt', '/users/tom/file2.txt', [ '/users/tom/tmp/file3.txt' ] ]
```

*Note that for each directory level, the results are inside a nested array. A tool like `lodash/flatten` is useful in cases where you just want an array of filepaths.*
