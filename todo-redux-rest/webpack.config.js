const path = require('path');
const publicPath = path.join(__dirname, 'public');

module.exports = {
  entry: path.join(publicPath, 'todo-app.js'),
  output: {
    path: publicPath,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
        //loaders: ['react-hot', 'babel-loader', 'eslint-loader']
      }
    ]
  },
  devServer: {
    proxy: {
      '/todos': {
        target: 'http://localhost:8081'
      },
      '/todos/*': {
        target: 'http://localhost:8081'
      }
    }
  }
};
