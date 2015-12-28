const path = require('path');
const jsPath = path.join(__dirname, 'public');

module.exports = {
  entry: './public/todo-app.js',
  output: {
    path: 'public/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: jsPath, loader: 'babel-loader'},
      {test: jsPath, loader: 'eslint-loader'}
    ]
  },
  devServer: {
    proxy: {
      '/todos': {
        target: 'http://localhost:1919'
      },
      '/todos/*': {
        target: 'http://localhost:1919'
      }
    }
  }
};
