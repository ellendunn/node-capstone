'use strict'

const { Application } = require('../models/application');

// const { Users } = require('../users/models');

exports.getAllApps = (req, res) => {
	Application	
		.find()
		.then(applications => {
			res.json({
				applications: applications.map(
					(app) => app.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error 1'})
		})
}

exports.getApp = (req, res) => {
	Application
		.findById(req.params.id)
		.then(application => res.json(application.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error 2'})
		});
}

exports.postApp = (req, res) => {
	const requiredFields = ['role', 'company', 'status', 'created'];
	for (let i = 1; i < requiredFields; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message)
		}
	}
	Application
		.create({
			role: req.body.role,
			company: req.body.company,
			link: req.body.link,
			status: req.body.status,
			contacts: req.body.contacts,
			notes: req.body.notes,
			created: req.body.created
		})
		.then(application => {
			res.status(201).json(application.serialize())
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error 3'})
		});
}

exports.updateApp = (req, res) => {
		if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (`Request path id (${req.params.id}) must match id` +
		 ` in request body (${req.body.id})`);
		console.error(message);
		return res.status(400).json({message})
	}
	const update = {};
	const updateableFields = ['role','company','link','status','contacts','notes'];

	updateableFields.forEach(field => {
		if(field in req.body) {
			update[field] = req.body[field];
		}
	});

	Application
		.findByIdAndUpdate(req.params.id, {$set: update})
		.then(application => res.status(200).json(application)) 
		.catch(err => res.status(500).json({message: 'Internal Server Error 4'}));
}

exports.deleteApp = (req, res) => {
	Application
		.findByIdAndRemove(req.params.id)
		.then(application => res.status(204).end())
		.catch(err => res.status(500).json({ message: 'Internal Server Error 5' }))

}





