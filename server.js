var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var path = require('path');

var bundleStart = null;
var compiler = webpack(webpackConfig);

compiler.plugin('compile', function(){
  console.log("Bundling...");
  bundleStart = Date.now();
});

compiler.plugin('done', function(){
  console.log("Bundled in ..." + (Date.now() - bundleStart) +'ms!');
})

var bundler = new webpackDevServer(compiler, {
  // Webpack Dev Server DocumentRoot
  contentBase: path.resolve(__dirname, 'public'),

  // Webpack Dev Server takes this path to save the output file
  publicPath: '/',

  hot: true,
  quite: false,
  noInfo: false,
  stats: {
    colors: true
  }
})

bundler.listen(3000, 'localhost', function() {
  console.log("Bundling project, please wait...");
})
