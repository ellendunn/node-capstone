'use strict';

const router = require('express').Router();
const controllers = require('../controllers/users')

//Register a new user with POST
router.post('/', controllers.postUser);
router.get('/:id', controllers.getUser);
// router.get('/:id/location', controllers.getUserLocation)

// will need to remove
router.get('/', controllers.getAllUsers);

module.exports = { router }
