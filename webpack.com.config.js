const path = require('path');

let getRootPath = (rootPath) => (subPath) => {
  return path.join(__dirname, rootPath, subPath);
}
let getSubPath = getRootPath('./public/src/');

module.exports = {
  entry: [
    './public/src/index'
  ],
  output: {
    publicPath: '/dist/',
    path: `${__dirname}/public/dist/`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=images/[name].[ext]&limit=8192'
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.jsx?$/, loader: 'babel-loader'}
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
  }
}
