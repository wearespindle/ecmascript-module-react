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

const basePath = resolve(__dirname, 'input');
const basePathOut = resolve(__dirname, 'output');

if (argv.file && argv.url) {
  getFileList({
    filePath: argv.file,
    basePath
  })
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
    .catch(console.error);
}
