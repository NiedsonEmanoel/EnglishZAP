const express = require('express');
const api = express.Router();

api.use('/questions', require('./questionsRoute'));
api.use('/users', require('./usersRoute'));
api.use('/preferences', require('./preferencesRoute'));

module.exports = api;