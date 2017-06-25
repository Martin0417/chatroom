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

// process.on('uncaughtException', (e) => {
//     _.error(e);
// });

let webpackConf = require('./webpack.config');
let compiler = webpack(webpackConf);

// app.use('/public', express.static(`${__dirname}/src/public`));
// app.use('/dist', express.static(`${__dirname}/src/dist`));

app.use(favicon(`${__dirname}/src/public/favicon.ico`));

//webpack中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConf.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr'
}));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/public/index.html`);
});

io.on('connection', handle.bind(this, io));

http.listen(3000, () => {
  _.log('listening on *:3000');
});
