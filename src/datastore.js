'use strict';

const redis = require('redis');
const promisify = require('util').promisify;

const url = process.env.REDIS_URL || 'redis://redis'

const client = redis.createClient(url);
const get = promisify(client.get).bind(client);

module.exports = {
    get: async (key) => (await get(key)),
    set: (key, val) => {
        client.set(key, val);
    },
};
