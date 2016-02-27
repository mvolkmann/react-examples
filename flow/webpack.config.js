module.exports = {
  entry: './src/main.js',
  output: {
    path: 'build',
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel!eslint'
      }
    ]
  }
};
