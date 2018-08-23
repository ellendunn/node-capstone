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
