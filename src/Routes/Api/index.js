const express = require('express');
const api = express.Router();

api.use('/v1', require('./V1'))

module.exports = api;