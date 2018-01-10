const acorn = require('acorn');
const acornInjector1 = require('acorn-jsx/inject');
const acornInjector2 = require('acorn-object-rest-spread/inject');
acornInjector1(acorn);
acornInjector2(acorn);

const acornSettings = {
  ranges: true,
  locations: true,
  attachComment: true,
  tokens: true,
  ecmaVersion: 8,
  sourceType: 'module',
  plugins: {
    jsx: true,
    objectRestSpread: true
  }
};

module.exports = function(str, resolvedPath) {
  let parsed;
  const comments = [],
    tokens = [];

  try {
    parsed = acorn.parse(str, {
      ...acornSettings,
      sourceType: 'script',
      onComment: comments,
      onToken: tokens
    });
    parsed.comments = comments;
    parsed.tokens = tokens;
  } catch (e) {
    try {
      parsed = acorn.parse(str, {
        ...acornSettings,
        onComment: comments,
        onToken: tokens
      });
      parsed.comments = comments;
      parsed.tokens = tokens;
    } catch (e) {
      parsed = {};
    }
  }

  return parsed;
};
