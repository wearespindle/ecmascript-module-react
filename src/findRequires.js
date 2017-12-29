module.exports = function find(ob) {
  if (Array.isArray(ob)) {
    return Array.prototype.concat.apply([], ob.map(find)).filter(v => v);
  }

  if (ob && 'object' === typeof ob) {
    if (ob.type === 'ImportDeclaration') {
      return [ob.source.value];
    }

    if (ob.type === 'ExportAllDeclaration') {
      return [ob.source.value];
    }

    if (ob.type === 'CallExpression') {
      if (ob.callee && 'require' === ob.callee.name) {
        return [ob.arguments[0].value];
      }
    }

    return Array.prototype.concat
      .apply([], Object.keys(ob).map(key => find(ob[key])))
      .filter(v => v);
  }

  return [];
};
