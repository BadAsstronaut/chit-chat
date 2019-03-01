'use strict';

const ws = require('ws');

module.exports = httpServer => {
    const server = new ws.Server({ server: httpServer });
    server.on('connection', (ws, req) => {
        console.log(req);
    });
};
