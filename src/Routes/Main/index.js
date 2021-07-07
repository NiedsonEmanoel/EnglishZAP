const express = require('express');
const main = express.Router();
const path = require('path')

const baseDir = path.resolve(__dirname, '..', '..', 'Views', 'build');

main.use(express.static(`${baseDir}`))
main.get('/*', (req, res) => res.sendFile('index.html', { root: baseDir }));

module.exports = main;