'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
	notes: {type: String, default: ''},
	created: {type: Date},
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

applicationSchema.pre("find", function(next) {
  this.populate("user");
  next()
});

applicationSchema.pre("findOne", function(next) {
  this.populate("user");
  next()
});

applicationSchema.methods.serialize = function() {
	return {
		id: this._id,
		role: this.role,
		company: this.company,
		link: this.link,
		status: this.status,
		contacts: this.contacts,
		notes: this.notes,
		created: this.created,
		user: this.user
	};
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application }
