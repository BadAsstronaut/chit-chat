'use strict';

const http = require('http');
const httpHandler = require('./src/httpHanlder').handler;

const server = http.createServer(httpHandler);

const port = process.env.PORT || 80;

server.listen(port);
