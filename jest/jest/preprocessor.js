console.log('preprocessor.js: entered');
const babelJest = require('babel-jest');
const webpackAlias = require('jest-webpack-alias');

module.exports = {
  process: (src, filename) => {
    console.log('preprocessor.js process: filename =', filename);
    // Are there more files that need to be filtered out?
    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};
