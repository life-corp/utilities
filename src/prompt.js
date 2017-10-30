const read = require('read');

const prompt = (prompt, silent = false) =>
  new Promise((resolve, reject) => {
    read(
      { prompt, silent },
      (error, password) => (error ? reject(error) : resolve(password))
    );
  });

module.exports = prompt;
