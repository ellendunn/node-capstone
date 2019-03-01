'use strict'

const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {User} = require('../models/user');
const {JWT_SECRET} = require('../config');

const localStrategy = new LocalStrategy((username, password, callback) => {
	let user;
	User.findOne({ username: username })
		.then(_user => {
			user = _user;
			if (!user) {
				return 	callback(null, false); //401
			}
			return user.validatePassword(password);
		})
		.then(isValid => {
			if (!isValid) {
				return 	callback(null, false); //401

			}
			return callback(null, user); //200
		})
		.catch(err => {
			if(err.reason === 'LoginError') {
				return callback(err, false);
			} //40-43
			return callback(err, false); //500
		});
	});

const jwtStrategy = new JwtStrategy(
	{
		secretOrKey: JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		algorithms:['HS256']
	},
	(payload, done) => {
		done(null, payload.user);
	}
);

module.exports = { localStrategy, jwtStrategy };
