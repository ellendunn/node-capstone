const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Application } = require('../models')

const expect = chai.expect;

chai.use(chaiHttp);

describe('index html & main css page', function() {

	before(function(){
		return runServer(TEST_DATABASE_URL, 8081);
	});

	after(function(){
		return closeServer();
	})

	it('it should exist', function() {
		return chai 
		.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
		});
	});

	describe('GET applications endpoint', function() {

		it('should return all current applications', function() {
			let res;
			return chai.request(app)
				.get('/applications')
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
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body.applications).to.have.lengthOf.at.least(1);
					res.body.applications.forEach(function(application) {
						expect(application).to.be.a('object');
						expect(application).to.include.keys(
							'role', 'company', 'status' )
					});
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
							.send(updateData);
					})
					.then(function(res) {
						expect(res).to.have.status(204);
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
						return chai.request(app).delete(`/applications/${application.id}`);
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


