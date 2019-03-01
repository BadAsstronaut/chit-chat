'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

const mimeTypesMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
};

const docPath = url => {
    return url === '/'
        ? path.join(__dirname, '../web/index.html')
        : path.join(__dirname, '../', url);
};

const mimeType = file => {
    const ext = path.extname(file).toLowerCase();

    return mimeTypesMap[ext];
};

const handler = async (req, res) => {
    const file = docPath(req.url);
    const contentType = mimeType(file);

    res.writeHead(200, {
        'content-type': contentType,
    });

    res.write(await readFile(file));
    res.end();
};

module.exports = handler;
