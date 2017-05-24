'use strict';


//Server side controller
//This controller will query or change our database, and update the API with the results.
//Export clickHandler (db)

var Users = require('../models/users.js');
//var Poll = require('../models/polls.js');


function PollHandler () {

	this.getPolls = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				console.log(result);
				//result.polls.push("hola");
				res.json(result.polls);//Array
			});
	};

	this.addPoll = function (req, res) {
		
		/*var myPoll = new Poll;
		myPoll.name = 'hola';
		myPoll.opt.push('yea');*/
		
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { 'polls': [{ name: 'hola', options:[{nameopt:'opt1',vote:1}]}]  })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.polls);
				}
			);
			/*Users.findById({ 'twitter.id': req.user.twitter.id }, function (err, User) {
  if (err) { throw err; }
  console.log(req);
  User.polls.push({ name: 'hola', options:[{nameopt:'opt1',vote:1}]});
  User.save(function(){});
  res.json(User.polls);
});*/
	};

	this.resetPolls = function (req, res) {
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = PollHandler;
