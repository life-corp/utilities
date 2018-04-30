const fs = require('fs');

const dirExists = (dir) => {
  return new Promise((resolve, reject) => {
    fs.stat(directory, function(err, stats) {
      if (err) {
        if (err.errno === 34) {
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
