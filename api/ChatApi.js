"use strict";

var Util 	= require('../crawl/fork/Util');
var Address = require('../crawl/fork/Address');

(function() {

	var _create = function(message) {
		var splitMessage = message.split(' ');
		for (var index = 0; index < splitMessage.length; ++index) {
			var objMessage = Util.NumberOnly(splitMessage[index]);

			if (objMessage.length === 8) {
				Address.Enqueue(objMessage);
			}
		}

		return null;
	};

	module.exports.Create = _create;

})();