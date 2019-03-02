'use strict';

const http = require('http');

const httpHandler = require('./src/httpHanlder');
const webSocketHandler = require('./src/webSocketHandler');

const server = http.createServer(httpHandler);
const port = process.env.PORT || 80;

webSocketHandler(server);

server.listen(port);
