"use strict";

var Address 	= require('./crawl/fork/address');
var Cluster 	= require('cluster');
var Fork 		= require('./crawl/fork');

(function() {

	var handleMessage = function(message) {
		if (!message.command) {
			return;
		}

		var worker = {};
		for (var id in Cluster.workers) {
			if (Cluster.workers[id].process.pid === message.pid) {
				worker = Cluster.workers[id];
			}
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
		}
	};

	var _init = function() {
		Cluster.on('message', handleMessage);

		Fork.Init();
	};

	module.exports.Init = _init;

})();