const fs = require('fs');
const path = require('path');

/**
 * Recursively traverses a directory and returns the full path to all the files
 * contained inside it and its subdirectories.
 * @param {String} dir The file path to the directory to start walking.
 * 
 * @returns {Array} Array of filepaths contained in the given dir.
 */
const walkSync = (dir, filelist = []) =>
  fs
    .readdirSync(dir)
    .map((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        return walkSync(path.join(dir, file), filelist);
      }
      return filelist.concat(path.join(dir, file))[0];
    });

module.exports = walkSync;
