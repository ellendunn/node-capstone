const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index html & main css page', function() {

	it('should exist', function() {
		return chai 
		.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})

	})
})