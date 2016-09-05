var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    APP_DIR + '/index.js' // Your appʼs entry point
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.css$/, loader: 'style-loader!css-loader?minimize' },
      { test: /\.less$/, loader: "style-loader!css-loader?minimize!less-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: "file-loader" },
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: APP_DIR
      }
    ]
  },
  plugins: [
  ]
};

module.exports = config;
