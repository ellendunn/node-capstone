
const express = require('express');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const {Application} = require('./models');
const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(express.static('public'));
app.use(express.json());


// Application.create({
// 			'id': '11111111',
// 			'role': 'Junior Developer',
// 			'company': 'Google',
// 			'link': 'url.com',
// 			'status': 'Applied',
// 			'notes': 'need to follow up!',
// 			'created': 1470016976609
// 		});
// Application.create({
// 			'id': '22222222',
// 			'role': 'Senior Software Engineer',
// 			'company': 'Amazon',
// 			'link': 'url.com',
// 			'status': 'Interviewing',
// 			'contacts': {
// 				'name': 'Sarah Adams',
// 				'email': 'adams.sarah@amazon.com',
// 				'phone': '312-555-1234'
// 				},
// 			'created': 1470016976608
// 		});
// Application.create({
// 			'id': '33333333',
// 			'role': 'DevOps Engineer',
// 			'company': 'Thinkful',
// 			'link': 'url.com',
// 			'status': 'Visited Application',
// 			'notes': 'still need to apply',
// 			'created': 1470016976607
		// });

app.get('/applications', (req,res) => {
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
})

app.get('/applications/:id', (req, res) => {
	Application
		.findById(req.params.id)
		.then(application => res.json(application.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error 2'})
		});
});

app.post('/applications', (req, res) => {
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
		.then(application => res.status(201).json(application.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error 3'})
		});
});

app.put('/applications/:id', (req,res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (`Request path id (${req.params.id}) must match id` +
		 `in request body (${req.bdy.id})`);
		console.err(message);
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
		.then(application => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal Server Error 4'}));
});

app.delete('/applications/:id', (req,res) => {
	Application
		.findByIdAndRemove(req.params.id)
		.then(application => res.status(204).end())
		.catch(err => res.status(500).json({ message: 'Internal Server Error 5' }))
})

app.use('*', function(req,res) {
	res.status(404).json({message: 'Not Found'});
})

let server;

function runServer(databaseUrl, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}


if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

