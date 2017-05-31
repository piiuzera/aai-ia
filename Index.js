"use strict";

var Address 	= require('./crawl/fork/Address');
var ChatRouter 	= require('./router/ChatRouter');
var Cluster 	= require('cluster');
var Fork 		= require('./crawl/Fork');

(function() {

	var handleMessage = function(worker, message) {
		if (!message.command) {
			return;
		}

		if (message.command === 'GetCrawl') {
			worker.send({
				command: 'SetCrawl',
				data: {
					crawl: Address.Dequeue()
				}
			});
		} else if (message.command === 'SendAddress') {
			ChatRouter.ResponseText(
				message.data.address || message.data.addresses,
				message.data.hash
			);
		}
	};

	var _init = function() {
		Cluster.on('message', handleMessage);

		Fork.Init();
	};

	module.exports.Init = _init;

})();