const { resolve } = require('path');

const regexp = /^.*node_modules/;
module.exports = function({ file, basePath, basePathOut }) {
  if (file.includes('node_modules')) {
    return resolve(file.replace(regexp, basePathOut));
  }
  return resolve(file.replace(basePath, basePathOut));
};
