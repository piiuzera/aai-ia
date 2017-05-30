"use strict";

var Address 		= require('./fork/Address');
var Config 			= require('./fork/Config');
var Cluster 		= require('cluster');
var Log 			= require('./fork/Log');

(function() {

    var workers = [];

    var scaleLoop   = {};
    var scaleLoopMs = 5000;

    var SetScale = function() {
        var workersId       = Object.keys(workers);
        var resolution      = Address.Length() / Config.defaults.threads;
        var newThreads      = 0;

        Log.Info('ZIPCODES     : ' + Address.Length()           + '\r\n');
        Log.Info('THREADS      : ' + Config.defaults.threads    + '\r\n');
        Log.Info('RESOLUTION   : ' + resolution                 + '\r\n');
        Log.Info('RUNNING      : ' + workersId.length           + '\r\n');

        if (Config.defaults.threads > workersId.length) {
            newThreads = Config.defaults.threads - workersId.length;

            if (resolution < 1) {
                newThreads = Address.Length() - workersId.length;
            }

            StartWorkers(newThreads);
            return;
        }
    };

    var StartWorkers = function(quantity) {
        Log.Info('START WORKERS');

        for (var i = 0; i < quantity; i++) {
            var worker = Cluster.fork();

            workers[worker.id] = worker;
        }

        Log.Info('TOTAL THREADS: [' + Object.keys(workers).length + ']');
    };

    var _init = function() {
        Cluster.setupMaster({
            exec: './crawl/Worker.js',
            args: ['--use', 'http']
        });

        SetScale();
        scaleLoop = setInterval(
            SetScale,
            scaleLoopMs
        );
    };

    module.exports.Init = _init;

})();