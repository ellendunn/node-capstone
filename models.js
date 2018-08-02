'use strict'

const mongoose = require('mongoose');


const applicationSchema = mongoose.Schema({
	role:{type: String, required: true},
	company: {type: String, required: true},
	link: {type: String},
	status: {type: String, required: true},
	contacts: {
		name: {type: String},
		title: {type: String},
		email: {type: String},
		phone: {type: String}
	},
	notes: {type: String},
	created: {type: Date}
});

applicationSchema.methods.serialize = function () {
	return {
		id: this._id,
		role: this.role,
		company: this.company,
		link: this.link,
		status: this.status,
		contacts: this.contacts,
		notes: this.notes,
		created: this.created
	};
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application } 
