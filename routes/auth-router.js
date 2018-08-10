'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = require('express').Router();

const createAuthToken = function(user){
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

//user must provide correct username and password at /auth/login to obtain JWT
const localAuth = passport.authenticate('local', {session: false});
router.post('/login', localAuth, (req,res) => {
	const authToken = createAuthToken(req.user.serialize());
	res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req,res) => {
	const authToken = createAuthToken(req.user);
	res.json({authToken});
});

module.exports = { router }
