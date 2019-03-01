'use strict'

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
	firstName: {type: 'string', default: ''},
	lastName: {type: 'string', default: ''},
	username: {
		type: 'string',
		required: true,
		unique: true,
	},
	password: {
		type: 'string',
		required: true
	}
});

userSchema.methods.serialize = function() {
	return{
		id: this._id,
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		username: this.username || '',
	};
};

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = { User }
