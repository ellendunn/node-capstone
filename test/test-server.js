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

describe('Applications API resource', function() {
	this.timeout(10000);

	before(function(){
		return runServer(TEST_DATABASE_URL, 8080);
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
	})

})
