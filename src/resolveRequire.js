const { resolve, dirname, basename, join, sep } = require('path');

module.exports = function resolveRequire({ file, dir, basePath }) {
  let resolved;
  let isResolved;

  let fileName = basename(file);
  let fileDir = dirname(file);

  if (fileName === file) {
    fileDir = fileName;
    fileName = '';
  }
  const dirFile = resolve(dir, file);
  const basePathFile = resolve(basePath, file);
  const resolvePaths = [dirFile, basePathFile, dirname(dirFile), dirname(basePathFile)]
    .concat(require.resolve.paths(fileName))
    .map(p => {
      if (p.endsWith('node_modules')) {
        return join(p, fileDir);
      } else {
        return p;
      }
    });

  try {
    resolved = require.resolve(fileName, {
      paths: resolvePaths
    });

    isResolved = true;
  } catch (e) {
    resolved = undefined;
    isResolved = false;
  }

  return {
    original: file,
    resolved,
    isResolved
  };
};
