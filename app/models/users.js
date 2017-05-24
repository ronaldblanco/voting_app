'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = require('../models/polls.js');

var User = new Schema({
	/*github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},*/
	twitter: {
		id: String,
		displayName: String,
		username: String,
      photo: String
	},
	//polls: [Poll],
	polls: [{name:String, opt:[{nameopt:String, vote: Number}]}],
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);
