var webpack = require('webpack')
var path = require('path');

module.exports = {
  entry: './viewModules/index.jsx',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, 
        loader: 'babel',
        query:
             {
               presets:['es2015', 'react']
             }
      },
      { test: /\.js$/, exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
