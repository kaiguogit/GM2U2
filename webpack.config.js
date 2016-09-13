var webpack = require('webpack')
var path = require('path');
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  console.log("host in env is", process.env.host);
}

module.exports = {
  entry: './modules/index.jsx',

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
