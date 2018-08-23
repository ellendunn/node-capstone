const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Application } = require('../models/application')
const { User } = require('../models/user')

const expect = chai.expect;
// 
// before(function () {
//     return runServer(TEST_DATABASE_URL);
// });
//
// beforeEach(function () {});
//
// afterEach(function () {
//     return User.remove({});
// });
//
// after(function () {
//     return closeServer();
// });
