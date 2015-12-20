const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app/TodoListCmp.ts'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
    ],
    noParse: [/angular2\/bundles\/.+/]
  },

  devServer: {
    historyApiFallback: true
  }
};
