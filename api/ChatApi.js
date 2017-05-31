"use strict";

var Address = require('../crawl/fork/Address');
var Robot 	= require('../Robot');

(function() {

	var _create = function(message, hash, callback) {
		Robot.SendMessage(
			message,
			CheckCreate.bind(this, hash, callback)
		);
	};

	var CheckCreate = function(hash, callback, send) {
		if (send && send.crawl) {
			send.hash 		= hash;
			send.message 	= escape(send.message)
			Address.Enqueue(send);
		}

		callback(send);
	};

	module.exports.Create = _create;
})();