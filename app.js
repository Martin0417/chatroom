const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const favicon = require('serve-favicon');
const _ = require('util');
const handle = require('./handleSocket');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const [isProd, isDev] = [process.env.NODE_ENV === 'production', process.env.NODE_ENV !== 'production'];
const dir = isProd ? 'dist' : 'src';

process.on('uncaughtException', (e) => {
    _.error(e);
});

app.use(`/dist`, express.static(`${__dirname}/public/${dir}`));
app.use(favicon(`${__dirname}/public/src/favicon.ico`));

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
  res.sendFile(`${__dirname}/public/src/index.html`);
});

io.on('connection', handle.bind(this, io));

http.listen(3000, () => {
  _.log('listening on *:3000');
});
