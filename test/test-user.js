const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Application } = require('../models/application')
const { User } = require('../models/user')

const expect = chai.expect;

describe('Applications API resource', function() {
  this.timeout(10000);
  before(function () {
      return runServer(TEST_DATABASE_URL, 8082);
  });

  beforeEach(function () {});

  afterEach(function () {
      return User.remove({});
  });

  after(function () {
      return closeServer();
  });

    describe('POST users endpoint', function() {
      it.only('should add new user on post', function() {
        const newUser = {
          'firstName': 'Donna',
          'lastName': 'Kline',
          'username': 'donnakline',
          'password': 'ellenanddonna'
        }

        return chai.request(app)
					.post('/users')
					.send(newUser)
					.then(function(res){
						expect(res).to.have.status(201);
						expect(res).to.be.json;
						expect(res.body).to.be.a('object');
						expect(res.body).to.include.keys(
							'id', 'firstName', 'lastName', 'username');
						expect(res.body.id).to.not.be.null;
						expect(res.body.firstName).to.equal(newUser.firstName);
						expect(res.body.lastName).to.equal(newUser.lastName);
						expect(res.body.username).to.equal(newUser.username);
						return User.findById(res.body.id);
					})
					.then(function(user) {
						expect(user.firstName).to.equal(newUser.firstName);
						expect(user.lastName).to.equal(newUser.lastName);
						expect(user.username).to.equal(newUser.username);
					});

      })
    })

})
