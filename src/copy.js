const fs = require('fs');

/**
 * Takes an array of 'src', 'dest' filepath mappings and asynchronously
 * writes the `src` file to the `dest` path
 * @param {Array} filePaths
 * 
 * @returns {Promise} Resolves once all the files are copied, rejects on any
 * errors.
 */
const copy = (filePaths) => new Promise((resolve, reject) => {
  let done = 0;
  filePaths.forEach(({src, dest}) => {
    if (!src || !dest) return reject();
    fs.createReadStream(src)
      .on('error', reject)
      .pipe(fs.createWriteStream(dest))
      .on('error', reject)
      .on('finish', () => {
        done += 1;
        if (done === filePaths.length) resolve();
      });
  });
}); 

module.exports = copy;
