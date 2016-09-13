var webpack = require('webpack')
var path = require('path');
require('dotenv').config();
console.log("\n!!!!!host in env is", process.env.host);
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
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env.host": process.env.host.toString()
    })
  ]
}
