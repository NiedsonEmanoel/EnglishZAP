const express = require('express');
const route = express.Router();
const { Preferences } = require('../../../Controllers')

route.get('/', Preferences.index)
route.post('/', Preferences.createPreference)
route.put('/', Preferences.tapToNext)
route.patch('/', Preferences.ableTo)
module.exports = route;