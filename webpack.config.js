var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var ReloadPlugin = require('reload-html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'app/index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true
  }
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    path.resolve(__dirname, 'app', 'index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified.
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname,'node_modules')],
        loader: 'babel-loader',
        babelrc: false,
        query: {
          presets: ['react', 'es2015'],
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HTMLWebpackPluginConfig,
    new ReloadPlugin()
  ]

}
