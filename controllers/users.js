'use strict'

const express = require('express');

const { User } = require('../models/user');

exports.postUser = (req, res) => {
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		console.log('here')
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}

	const stringFields = ['username', 'password', 'firstName', 'lastName'];
	const notStringFields = stringFields.find(field => {
		return field in req.body && typeof req.body[field] !== 'string'
	});

	if (notStringFields) {
		console.log('here 1')
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Incorrect field type: expected string',
			location: notStringFields
		});
	}

	//Trimming the username and password from spaces
	const trimmedFields = ['username', 'password'];
	const nonTrimmedfield = trimmedFields.find(
		field => req.body[field].trim() != req.body[field]
		)

	if(nonTrimmedfield) {
		console.log('here 2')
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Cannot start or end field with whitespace',
			location: nonTrimmedfield
		});
	}

	const sizedFields = {
		username: {	min: 1 },
		password: { min: 6, max: 72 }
	};

	const tooShortField = Object.keys(sizedFields).find((field) =>
		'min' in sizedFields[field] &&
					req.body[field].trim().length < sizedFields[field].min
	);

	const tooLongField = Object.keys(sizedFields).find((field) =>
		'max' in sizedFields[field] &&
					req.body[field].trim().length > sizedFields[field].max
	);

	if (tooShortField || tooLongField) {
		console.log('here')
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: tooShortField
				? `Password must be at least ${sizedFields[tooShortField].min} characters long`
				: `Password cannot exceed ${sizedFields[tooLongField].max} characters`,
			location: tooShortField || tooLongField
		});
	}

	let {username, password, location='', firstName = '', lastName = ''} = req.body;
	firstName = firstName.trim();
	lastName = lastName.trim();
	location = location.trim();

	return User.find({username})
		.count()
		.then(count => {
			if (count > 0) {
				return Promise.reject({
				code: 422,
				reason: 'ValidationError',
				message: 'Username is already taken',
				location: 'username'
				});
			}
			return User.hashPassword(password);
		})
		.then(hash => {
			return User.create({
				firstName,
				lastName,
				location,
				username,
				password: hash
			});
		})
		.then(user => {
			console.log(user)
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			if (err.reason = 'ValidationError') {
				return res.status(err.code).json(err);
			}t
			res.status(500).json({code: 500, message: 'Internal Server Error'})
		});
};

exports.getUser = (req, res) => {
	User
		.findById(req.params.id)
		.then(user => {
			console.log(user);
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error 1'})
		});
}

exports.getUserLocation = (req, res) => {
	User
		.findById(req.params.id)
		.then(user => {
			console.log(user.location);
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error 1'})
		});

}

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(users => {
      res.json({
        users: users.map(
          (user) => user.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error 2'})
    })
}
