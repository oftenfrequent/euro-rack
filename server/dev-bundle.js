import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack.config.js'
import path from 'path'
import fs from 'fs'

export default () => {

  let bundleStart = null;
  const compiler = Webpack(webpackConfig);

  compiler.plugin('compile', function() {
    console.log('Bundling for development...')
    bundleStart = Date.now()
  })

  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {
    publicPath: '/server/dist/',
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    quiet: true, //false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8080, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });

};
