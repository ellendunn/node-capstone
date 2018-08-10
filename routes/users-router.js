'use strict';

const router = require('express').Router();
const controllers = require('../controllers/users')

// const passport = require('passport');
// const jwtAuth = passport.authenticate('jwt', { session: false });
// router.use('jwtAuth')

//Register a new user with POST
router.post('/', controllers.postUser);
router.get('/:id', controllers.getUser);
// will need to remove
router.get('/', controllers.getAllUsers);

module.exports = { router }
