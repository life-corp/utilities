const fs = require('fs');

const dirExists = (directory) => {
  return new Promise((resolve, reject) => {
    fs.stat(directory, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // Directory does not exist.
          resolve(false);
        } else {
          // Some other error occurred.
          reject(err);
        }
      } else {
        // Directory exists.
        resolve(true);
      }
    });
  });
};

module.exports = dirExists;
