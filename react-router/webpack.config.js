const path = require('path');
const jsPath = path.join(__dirname, 'src');

module.exports = {
  entry: './src/demo.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: jsPath,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {test: jsPath, loader: 'eslint-loader'}
    ]
  }
};
