'use strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const router = require('./routes') //should the router file also include users and auth router??

mongoose.promise = global.Promise;

const { Application } = require('./models/application');
const { PORT, DATABASE_URL } = require('./config');

const app = express();

// app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
	if(req.method = 'OPTIONS')  {
		return res.sendStatus(204)
	}
	next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/applications', router);
app.use('/users/', usersRouter);//now do I need to add /api before endpoints?
app.use('/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/protected', jwtAuth, (req,res) => {
	return res.json({
		data: 'applications' //is this the data to access? it should be the user
	});
});

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

