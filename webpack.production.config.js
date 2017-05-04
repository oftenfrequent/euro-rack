const webpack = require('webpack')

module.exports = {
  context: __dirname + '/browser',
  entry: [ './index.jsx' ],
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/server/dist',
    publicPath: '/server/dist/',
    filename: 'bundle.js' // TODO: add chunkhash
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name:      'main', // Move dependencies to our main file
      children:  true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBFONT_ID: JSON.stringify(process.env.WEBFONT_ID)
      }
    }),
  ]

};