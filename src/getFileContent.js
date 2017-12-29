const util = require('util');
const fs = require('fs');
const { resolve } = require('path');
const flowRemoveTypes = require('flow-remove-types');
const readFile = util.promisify(fs.readFile);

module.exports = function(pathString) {
  const filePath = resolve(pathString);
  return readFile(filePath, 'utf8').then(str =>
    flowRemoveTypes(str, { pretty: true, all: true }).toString()
  );
};
