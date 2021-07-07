const express = require('express');
const route = express.Router();
const {Users} = require('../../../Controllers')

route.get('/', Users.index)
route.post('/', Users.create);

module.exports = route;