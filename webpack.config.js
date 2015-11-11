var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app', 'index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified.
    publicPath: path.resolve(__dirname, 'public')
  },

  modules: {
    loaders: [
      {test: /\.html$/, loader: 'babel-lader', exclude: [path.resolve(__dirname,'node_modules')]},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]

}
