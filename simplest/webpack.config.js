module.exports = {
  entry: './src/demo.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel!eslint'},
    ]
  }
};
