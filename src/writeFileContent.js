const util = require('util');
const fs = require('fs');
const { dirname } = require('path');
const writeFile = util.promisify(fs.writeFile);
const mkdirp = util.promisify(require('mkdirp'));

module.exports = function({ file, data }) {
  return mkdirp(dirname(file))
    .then(() => writeFile(file, data, 'utf8'))
    .then(() => file);
};
