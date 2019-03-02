'use strict';

const ws = require('ws');

const datastore = require('./datastore');

const chatLogKey = 'chat_log';

const handleMessage = server => async rawData => {
    const data = JSON.parse(rawData);
    const chatLogRaw = await datastore.get(chatLogKey);
    const chatLog = JSON.parse(chatLogRaw) || [];

    chatLog.push({
        user: data.user,
        message: data.message,
        datetime: new Date().toISOString(),
    });

    const updatedChatLog = JSON.stringify(chatLog);

    datastore.set(chatLogKey, updatedChatLog);
    server.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
            client.send(updatedChatLog);
        }
    })
};

module.exports = httpServer => {
    const server = new ws.Server({ server: httpServer });
    server.on('connection', socket => {
        socket.on('message', handleMessage(server));
    });
};
