const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let getRootPath = (rootPath) => (subPath) => {
  return path.join(__dirname, rootPath, subPath);
}
let getSubPath = getRootPath('./webapp/src/');

module.exports = {
  entry: [
    './webapp/src/index'
  ],
  output: {
    publicPath: '/dist/',
    path: `${__dirname}/webapp/dist/`,
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/, 
        use: 'url-loader?name=res/[name].[hash:8].[ext]&limit=8192'
      },
      {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?minimize=true'})
      },
      {
        test: /\.jsx?$/, use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx','.js','.css'],
    alias: {
      actions: getSubPath('./redux/actions'),
      reducers: getSubPath('./redux/reducers'),
      components: getSubPath('./components'),
      containers: getSubPath('./containers'),
      util: getSubPath('./util'),
    }
  },
  plugins: [
    new ExtractTextPlugin("css/bundle.css"), 
  ]
}
