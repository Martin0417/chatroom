const webpack = require('webpack')
const com = require('./webpack.com.config')

module.exports = Object.assign(com, {
  devtool: 'source-map',
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
})