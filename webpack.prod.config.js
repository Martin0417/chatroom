const webpack = require('webpack')
const com = require('./webpack.com.config')

let {plugins} = com;

[].push.apply(plugins, [
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV'])
]);

module.exports = Object.assign(com, {
  devtool: 'source-map',
  plugins
})