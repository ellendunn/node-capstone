const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { Application } = require('../models/application')
const { User } = require('../models/user')

const expect = chai.expect;

chai.use(chaiHttp);

const firstName = 'First';
const lastName = 'Last';
const username = 'username';
const password = 'password';
let id;

describe('Applications API resource', function() {
  this.timeout(10000);
  before(function () {
      return runServer(TEST_DATABASE_URL, 8082);
  });

  beforeEach(function() {
    return User.hashPassword(password)
      .then(pswd => {
        return User.create({
          firstName,
          lastName,
          username,
          password: pswd
        });
      })
      .then(user => {
         id = user.id;
      })
  })

  afterEach(function () {
      return User.remove({});
  });

  after(function () {
      return closeServer();
  });

  describe('POST to login endpoint', function() {
    it('should return a jwt token', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          expect(payload.user).to.deep.equal({
            id,
            firstName,
            lastName,
            username
          });
        });
    });
  });

})
