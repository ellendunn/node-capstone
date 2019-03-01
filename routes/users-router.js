'use strict';

const router = require('express').Router();
const controllers = require('../controllers/users')

//Register a new user with POST
router.post('/', controllers.postUser);

module.exports = { router }
