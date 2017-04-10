"use strict";

var Address 		= require('./fork/address');
var Config 			= require('./fork/config');
var Cluster 		= require('cluster');
var Log 			= require('./fork/log');

var workers = [];

var setScale = function() {
    var workersId       = Object.keys(workers);
    var resolution      = Address.getLength() / Config.defaults.threads;
    var newThreads      = 0;

    Log.info('ZIPCODES     : ' + Address.getLength() 		+ '\r\n');
    Log.info('THREADS      : ' + Config.defaults.threads 	+ '\r\n');
    Log.info('RESOLUTION   : ' + resolution 				+ '\r\n');
    Log.info('RUNNING      : ' + workersId.length 			+ '\r\n');

    if (Config.defaults.threads > workersId.length) {
        newThreads = Config.defaults.threads - workersId.length;

        if (resolution < 1) {
            newThreads = Address.getLength() - workersId.length;
        }

        startWorkers(newThreads);
        return;
    }
};

var startWorkers = function(quantity) {
    Log.info('START WORKERS');

    for (var i = 0; i < quantity; i++) {
        var worker = Cluster.fork();

        workers[worker.id] = worker;
    }

    Log.info('TOTAL THREADS: [' + Object.keys(workers).length + ']');
};

var init = function() {
    Cluster.setupMaster({
        exec: './crawl/worker.js',
        args: ['--use', 'http']
    });

    setScale();
};

exports.init = init;