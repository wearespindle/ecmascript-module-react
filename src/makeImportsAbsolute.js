const escodegen = require('escodegen');
const { dirname, resolve, sep } = require('path');
const getFileContent = require('./getFileContent');
const writeFileContent = require('./writeFileContent');
const parseFile = require('./parseFile');
const resolveRequire = require('./resolveRequire');
const flowRemoveTypes = require('flow-remove-types');

function absoluterise({ file, basePath, dir }) {
  const resolved = resolveRequire({
    dir: resolve(basePath, dir),
    file,
    basePath
  });

  if (resolved.isResolved) {
    return resolved.resolved;
  }
}

function makeImportsAbsolute({ file, basePath, blackList, url }) {
  return getFileContent(file).then(content => {
    const parsedFile = parseFile(content);
    const dir = dirname(file).replace(`${basePath}${sep}`, '');
    const { body } = parsedFile;
    let modified = false;

    if (body) {
      escodegen.attachComments(parsedFile, parsedFile.comments, parsedFile.tokens);

      body.forEach((l, index) => {
        if ('ImportDeclaration' === l.type || 'ExportAllDeclaration' === l.type) {
          const { value } = l.source;
          if (!(value in blackList)) {
            l.source.value = absoluterise({ file: value, basePath, dir }).replace(basePath, url);
            modified = true;
          } else {
            console.log(
              `not making import statement for '${l.source.value}' absolute since it is blacklisted`
            );
          }
        }
      });

      if (modified) {
        const generated = escodegen.generate(parsedFile, {
          format: {
            preserveBlankLines: true,
            compact: false
          },
          comment: true,
          sourceCode: content
        });

        return writeFileContent({
          file,
          data: generated
        });
      }
    }
    console.log(file);

    return Promise.resolve(file);
  });
}

module.exports = function({ files: { success, errors }, basePath, basePathOut, url }) {
  const blackList = errors.reduce((prev, cur) => Object.assign(prev, { [cur]: undefined }), {});

  return Promise.all(
    success.map(file =>
      makeImportsAbsolute({
        basePath: basePathOut,
        file: file.replace(basePath, basePathOut),
        blackList,
        url
      })
    )
  );
};
