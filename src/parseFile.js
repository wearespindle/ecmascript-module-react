const esprima = require('esprima');

const settings = {
  range: true,
  loc: true,
  tolerant: true,
  tokens: true,
  comment: true,
  jsx: true
};

module.exports = function(str) {
  let parsed;

  try {
    parsed = esprima.parseModule(str, settings);
  } catch (e) {
    try {
      parsed = esprima.parseScript(str, settings);
    } catch (e) {
      console.log(e.message);
      parsed = {};
    }
  }

  return parsed;
};
