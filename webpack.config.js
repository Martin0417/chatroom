const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client', 
    './src/public/index.js'
  ],
  output: {
    publicPath: '/dist/',
    path: `${__dirname}/dist/`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.jsx?$/, loader: 'babel-loader'}
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()  //让 webpack 启动全局 HMR
  ]
}