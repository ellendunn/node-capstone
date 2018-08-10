'use strict'

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
	firstName: {type: String, default: ''},
	lastName: {type: String, default: ''},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	}
});

// userSchema.virtual('name').get(function() {
//   return `${this.name.firstName} ${this.name.lastName}`.trim();
// });

userSchema.methods.serialize = function() {
	return{
		id: this.id,
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		password: this.password
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
