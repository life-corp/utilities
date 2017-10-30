const mkdirp = require('./mkdir-promise');

/**
 * Creates the (optionally nested) directories specied in the `dirPaths` array.
 * @param {Array} dirPaths Array of paths to create directories.
 * 
 * @returns {Promise} Resolves when all the directories have been created and
 * rejects on errors.
 */
const mkdirs = (dirPaths) => {
  let madeDirs = [];
  dirPaths.forEach(dir => {
    madeDirs.push(mkdirp(dir));
  });
  return Promise.all(madeDirs);
};

module.exports = mkdirs;
