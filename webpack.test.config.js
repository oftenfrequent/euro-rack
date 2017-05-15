const webpack = require('webpack')

module.exports = {
  context: __dirname + '/browser',
  entry: [
    './test/setup.js',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/browser/test',
    filename: 'test.spec.js'
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': 'window'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name:      'main', // Move dependencies to our main file
      children:  true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
  ]

};



