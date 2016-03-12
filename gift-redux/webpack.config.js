var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', // used by Bootstrap
      jQuery: 'jquery' // used by Bootstrap
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel!eslint'},
      {test: /\.css$/, exclude: /node_modules/, loader: 'style!css'},
      {test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass'}
    ]
  }
};
