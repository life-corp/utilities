const { exec } = require('child_process');
const mkdirp = require('./mkdir-promise');

const fileExists = (err) => /file exists/i.test(err.message);

const mountShare = ({ username, password, mountPath, sharePath }) =>
  new Promise((resolve, reject) => {
    mkdirp(mountPath)
      .then(() => {
        const cmd = `mount_smbfs //${username}:${password}@${sharePath} ${mountPath}`;
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            if (fileExists(err)) {
              return resolve(mountPath);
            }
            const passwordRegex = new RegExp(password, 'g');
            err.message = err.message.replace(passwordRegex, '********');
            if (err.cmd) {
              err.cmd = err.cmd.replace(passwordRegex, '********');
            }
            return reject(err);
          }
          resolve(mountPath);
        });
      })
      .catch(err => {
        if (fileExists(err)) {
          resolve(mountPath);
          return;
        }
        reject(err);
      });
  });

module.exports = mountShare;
