#!/usr/bin/env node
const argv = require('yargs').argv;
const util = require('util');
const rimraf = util.promisify(require('rimraf'));
const { resolve } = require('path');
const getFileList = require('./src/getFileList');
const writeFileContent = require('./src/writeFileContent');
const getFileContent = require('./src/getFileContent');
const normaliseOutputPath = require('./src/normaliseOutputPath');
const makeImportsAbsolute = require('./src/makeImportsAbsolute');
const joinFileListResults = require('./src/joinFileListResults');

const basePath = resolve(__dirname, 'input');
const basePathOut = resolve(__dirname, 'output');

if (!argv.file || !argv.url) {
  console.error(
    'please provide an output URL on which the modules should be loaded and at least one local path to a module'
  );
}

let files;
if (Array.isArray(argv.file)) {
  files = argv.file;
} else {
  files = [argv.file];
}

return (
  Promise.all(
    files.map(file =>
      getFileList({
        filePath: file,
        basePath
      })
    )
  )
    .then(joinFileListResults)
    .then(files =>
      rimraf(basePathOut)
        .then(() =>
          Promise.all(
            files.success.map(file =>
              getFileContent(file).then(data =>
                writeFileContent({
                  file: normaliseOutputPath({ file, basePath, basePathOut }),
                  data
                })
              )
            )
          )
        )
        .then(() => ({
          basePath,
          basePathOut,
          files,
          url: argv.url
        }))
    )
    .then(makeImportsAbsolute)
    // .then(console.log)
    .catch(console.error)
);
