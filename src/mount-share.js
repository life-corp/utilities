const { exec } = require('child_process');
const os = require('os');
const mkdirp = require('./mkdir-promise');

const fileExists = (err) => /file exists/i.test(err.message);

const mountShare = ({ username, mountPath, sharePath }) =>
  new Promise((resolve, reject) => {
    mkdirp(mountPath)
      .then(() => {
        let cmd;
        switch(os.platform()) {
          case 'darwin':
            cmd = `mount_smbfs //lifecorp.net;${username}@${sharePath} ${mountPath}`;
            break;
          case 'linux':
          //SERVER/sharename /mnt/mountpoint -o user=username,password=password,uid=username,gid=group,workgroup=workgroup,ip=serverip,iocharset=utf8
            cmd = `mount -t cifs ${sharePath} ${mountPath} -o user=${username},iocharset=utf8`;
            break;
          default:
            throw new Error('Expected platform to be one of darwin (macos) or linux got', os.platform());
        }
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
