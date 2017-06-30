const webpack = require('webpack')
const com = require('./webpack.com.config')

let {entry, plugins} = com;

entry.push('webpack-hot-middleware/client?reload=true');

[].push.apply(plugins, [
  new webpack.HotModuleReplacementPlugin()  //让 webpack 启动全局 HMR
]);

module.exports = Object.assign(com, {
  entry,
  plugins
})