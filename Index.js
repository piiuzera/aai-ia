"use strict";

var Address 	= require('./crawl/fork/address');
var Cluster 	= require('cluster');
var Fork 		= require('./crawl/fork');

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

	if (message.command === 'getZipcode') {
		worker.send({
			command: 'setZipcode',
			data: {
				zipcode: Address.get()
			}
		});
	} else if (message.command === 'setAddress') {
		Address.set(message.data.address);
	}
};

var Init = function() {
	Cluster.on('message', handleMessage);

	Address.init();
	Fork.init();
};

Init();