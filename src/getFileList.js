const path = require('path');
const getFileContent = require('./getFileContent');
const parseFile = require('./parseFile');
const findRequires = require('./findRequires');
const resolveRequire = require('./resolveRequire');

const files = {};
const unresolved = {};

module.exports = async function getFileList({ filePath, basePath }) {
  let resolvedPath;

  if (Array.isArray(filePath)) {
    resolvedPath = require.resolve(path.resolve(basePath, filePath[0]));
  } else {
    resolvedPath = require.resolve(path.resolve(basePath, filePath));
  }
  const dir = path.dirname(resolvedPath);

  files[resolvedPath] = undefined;

  const requires = await getFileContent(resolvedPath)
    .then(parseFile)
    .then(file => {
      if (Object.keys(file).length === 0) {
        console.log(filePath);
      }
      files[resolvedPath] = true;
      const requires = findRequires(file);
      if (Array.isArray.filePath) {
        filePath.forEach((p, index) => {
          if (index !== 0) {
            requires.push(require.resolve(path.resolve(basePath, filePath[index])));
          }
        });
      }
      return requires.map(file =>
        resolveRequire({
          file,
          dir,
          basePath
        })
      );
    })
    .then(requires => {
      const resolved = requires.map(r => r.resolved).filter(v => v);
      const newOnes = resolved.filter(p => !(p in files));

      requires.filter(v => !v.isResolved).forEach(r => {
        unresolved[r.original] = false;
      });

      if (newOnes.length) {
        newOnes.forEach(p => {
          files[p] = undefined;
        });
        return Promise.all(
          newOnes.map(n =>
            getFileList({
              filePath: n,
              basePath
            })
          )
        );
      }
    });

  return {
    success: Object.keys(files),
    errors: Object.keys(unresolved)
  };
};
