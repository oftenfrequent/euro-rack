const webpack = require('webpack')

module.exports = {
  context: __dirname + '/browser',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './index.jsx'
  ],
  devtool: 'eval',
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
    {
      test: /\.wav$/,
      loaders: ['file-loader', 'url-loader']
    },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    // path: __dirname + '/server/dist',
    // publicPath: '/server/dist/',
    path: __dirname + '/',
    // publicPath: '/',
    // publicPath: 'http://127.0.0.1:8888/'
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name:      'main', // Move dependencies to our main file
      children:  true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBFONT_ID: JSON.stringify(process.env.WEBFONT_ID)
      }
    }),
  ]

};



