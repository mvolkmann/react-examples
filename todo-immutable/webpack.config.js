const path = require('path');
const jsPath = path.join(__dirname, 'src');

module.exports = {
  entry: './src/todo.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {test: jsPath, loader: 'babel-loader'},
      {test: jsPath, loader: 'eslint-loader'}
    ]
  }
};
