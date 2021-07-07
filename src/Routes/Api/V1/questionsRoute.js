const express = require('express');
const route = express.Router();
const {Questions} = require('../../../Controllers');

route.get('/', Questions.index);
route.get('/:chatId', Questions.details)
route.post('/', Questions.createQuestion)

module.exports = route;