const mkdirp = require('mkdirp');

const mkdirPromise = (dirPath, ignoreIfExists = true) =>
  new Promise((resolve, reject) => {
    mkdirp(dirPath, (err) => {
      if (err) {
        if (ignoreIfExists && /file exists/i.test(err.message)) {
          resolve(dirPath);
          return;
        }
        reject(err);
      }
      resolve(dirPath);
    });
  });

module.exports = mkdirPromise;
