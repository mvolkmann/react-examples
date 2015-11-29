const babelJest = require('babel-jest');
const webpackAlias = require('jest-webpack-alias');

module.exports = {
  process: (src, filename) => {
    if (filename.indexOf('node_modules') === -1) {
      console.log('preprocessor.js process: filename =', filename);
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};
