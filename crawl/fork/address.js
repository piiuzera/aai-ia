"use strict";

var Log		= require('./log');

(function() {
	var addresses 	= [];
	var zipcodes 	= [];

	var _dequeue = function() {
		return zipcodes.shift();
	};

	var _enqueue = function(zipcode) {
		if (!zipcode) {
			return;
		}

		zipcodes.push(zipcode);
	};

	var _length = function() {
		return zipcodes.length;
	};

	module.exports.Dequeue 	= _dequeue;
	module.exports.Enqueue 	= _enqueue;
	module.exports.Length 	= _length;
})();