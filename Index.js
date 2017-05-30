"use strict";

var Address 	= require('./crawl/fork/Address');
var Cluster 	= require('cluster');
var ChatRouter	= require('./router/ChatRouter');
var Fork 		= require('./crawl/Fork');

(function() {

	var handleMessage = function(worker, message) {
		if (!message.command) {
			return;
		}

		if (message.command === 'GetZipcode') {
			worker.send({
				command: 'SetZipcode',
				data: {
					zipcode: Address.Dequeue()
				}
			});
		} else if (message.command === 'SetAddress') {
			Address.Enqueue(message.data.address);

			ChatRouter.ResponseText(message.data.message);
		}
	};

	var _init = function() {
		Cluster.on('message', handleMessage);

		Fork.Init();
	};

	module.exports.Init = _init;

})();