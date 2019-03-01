const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { Application } = require('../models/application')
const { User } = require('../models/user')

const expect = chai.expect;

chai.use(chaiHttp);

function seedApps(userId) {
		const seedData = [];
		for (i=1; i<=10; i++) {
			seedData.push(generateApps(userId));
		};
		return Application.insertMany(seedData);
}

function generateApps(userId) {
	return {
		role: faker.lorem.sentence(),
		company: faker.company.companyName(),
		link: faker.internet.url(),
		status: faker.lorem.word(),
		user: userId,
		date: faker.date.recent()
	}
}

function tearDownDb() {
	return mongoose.connection.dropDatabase();
}

const username = 'username';
const password = 'password';

let jwt, userId;

describe('Applications API resource', function() {
	this.timeout(10000);

	before(function(){
		return runServer(TEST_DATABASE_URL, 8080);
	});

	beforeEach(function() {
		return User.hashPassword(password).then(password =>
		      User.create({
		        username,
		        password
		      })
		    )
				.then(function(user) {
					userId = user._id;
					return chai.request(app)
					.post('/auth/login')
					.send({username, password})
				})
				.then(function(res) {
					jwt = res.body.authToken;
					return seedApps(userId)
			    })
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function(){
		return closeServer();
	})

	describe('GET applications endpoint', function() {
		this.timeout(10000);

		it('should return all current applications', function() {
			let res;
			return chai.request(app)
				.get('/applications')
				.set('Authorization', `Bearer ${jwt}`)
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
					expect(res.body.applications).to.have.lengthOf.at.least(1);
					return Application.count();
				})
				.then(function(count) {
					expect(res.body.applications).to.have.lengthOf(count)
				});
		});

		it('should return applications with the correct fields', function(){
			let resApplication;
			return chai.request(app)
				.get('/applications')
				.set('Authorization', `Bearer ${jwt}`)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body.applications).to.have.lengthOf.at.least(1);
					res.body.applications.forEach(function(application) {
						expect(application).to.be.a('object');
						expect(application).to.include.keys(
							'role', 'company', 'status' )
						});
						resApplication = res.body.applications[0];
						return Application.findById(resApplication.id);
				})
				.then(function(app) {
          console.log(resApplication, app)
					expect(resApplication.id).to.equal(app.id);
					expect(resApplication.role).to.equal(app.role);
					expect(resApplication.company).to.equal(app.company);
					expect(resApplication.status).to.equal(app.status);
				});
		});
	});

		describe('POST requests endpoint', function() {
			it('should add a new application', function() {
				const newApplication = {
					'role': 'Junior Developer in Test',
					'company': 'Google',
					'link': 'url.com',
					'status': 'Applied',
					'notes': 'need to follow up!'
					};

				return chai.request(app)
					.post('/applications')
					.set('Authorization', `Bearer ${jwt}`)
					.send(newApplication)
					.then(function(res){
						expect(res).to.have.status(201);
						expect(res).to.be.json;
						expect(res.body).to.be.a('object');
						expect(res.body).to.include.keys(
							'id', 'role', 'company', 'status');
						expect(res.body.id).to.not.be.null;
						expect(res.body.role).to.equal(newApplication.role);
						expect(res.body.company).to.equal(newApplication.company);
						expect(res.body.status).to.equal(newApplication.status);
						// expect(res.body.created).to.equal(newApplication.created);
						return Application.findById(res.body.id);
					})
					.then(function(application) {
						expect(application.role).to.equal(newApplication.role);
						expect(application.company).to.equal(newApplication.company);
						expect(application.status).to.equal(newApplication.status);
						// expect(application.created).to.equal(newApplication.created);
					});
			});
		});

		describe('PUT request endoint', function() {
			it('should update an application', function() {
				const updateData = {
					role: 'Role Title',
					company: 'Name of Company',
					status: 'current status'
				};

				return Application
					.findOne()
					.then(function(application) {
						updateData.id = application.id;

						return chai.request(app)
							.put(`/applications/${application.id}`)
							.set('Authorization', `Bearer ${jwt}`)
							.send(updateData);
					})
					.then(function(res) {
						expect(res).to.have.status(200);
						return Application.findById(updateData.id);
					})
					.then(function(application) {
						expect(application.role).to.be.equal(updateData.role);
						expect(application.company).to.be.equal(updateData.company);
						expect(application.status).to.be.equal(updateData.status)
					});
			});
		});

		describe('DELETE request endpoint', function() {
			it('should delete an application by id', function() {
				let application;

				return Application
					.findOne()
					.then(function(_application) {
						application = _application;
						return chai.request(app)
            .delete(`/applications/${application.id}`)
            .set('Authorization', `Bearer ${jwt}`)
					})
					.then(function(res) {
						expect(res).to.have.status(204);
						return Application.findById(application.id);
					})
					.then(function(_application) {
						expect(_application).to.be.null;
					});
			});
		});
})
