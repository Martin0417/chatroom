const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const favicon = require('serve-favicon');
const _ = require('util');
const handle = require('./handleSocket');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  // pingInterval: 2000,
  // pingTimeout: 1000
});

const [isProd, isDev] = [process.env.NODE_ENV === 'production', process.env.NODE_ENV !== 'production'];

process.on('uncaughtException', (e) => {
    _.error(e);
});

app.use(favicon(`${__dirname}/webapp/src/favicon.ico`));

if(isProd){
  app.use('/dist', express.static(`${__dirname}/webapp/dist`));
}

if(isDev){
  let webpackConf = require(`./webpack.dev.config`);
  let compiler = webpack(webpackConf);
  //webpack开发中间件
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
  }));
}

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/webapp/src/index.html`);
});

io.on('connection', handle.bind(this, io));

http.listen(3000, () => {
  _.log('listening on *:3000');
});
