'use strict';

const http = require('http');
const httpHandler = require('./src/httpHanlder').handler;

// const ioServer = require('socket.io')();

const port = process.env.PORT || 80;

// ioServer.on('connection', (client) =)

// create handler function

const server = http.createServer(httpHandler);

server.listen(port);
