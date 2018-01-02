module.exports = function(results) {
  return Object.keys(results[0]).reduce(
    (prev, resultName) =>
      Object.assign(prev, {
        [resultName]: Array.prototype.concat.apply([], results.map(result => result[resultName]))
      }),
    {}
  );
};
