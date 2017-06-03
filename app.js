const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('util');
const handle = require('./handleSocket');

process.on('uncaughtException', (e) => {
    _.error(e);
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', handle.bind(this, io));

http.listen(3000, () => {
  _.log('listening on *:3000');
});
