"use strict";

var Address 		= require('./fork/Address');
var Config 			= require('./fork/Config');
var Cluster 		= require('cluster');
var Log 			= require('./fork/Log');

(function() {

    var workers = [];

    var scaleLoop   = {};
    var scaleLoopMs = 500;

    var SetScale = function() {
        var workersId       = Object.keys(workers);
        var resolution      = Address.Length() / Config.GetDefaults().threads;
        var newThreads      = 0;

        if (Config.GetDefaults().threads > workersId.length) {
            newThreads = Config.GetDefaults().threads - workersId.length;

            if (resolution < 1) {
                newThreads = Address.Length() - workersId.length;
            }

            StartWorkers(newThreads);
            return;
        }
    };

    var StartWorkers = function(quantity) {
        for (var i = 0; i < quantity; i++) {
            var worker = Cluster.fork();

            workers[worker.id] = worker;
        }
    };

    var _init = function() {
        Cluster.setupMaster({
            exec: './crawl/Worker.js',
            args: ['--use', 'http']
        });

        SetScale();
        scaleLoop = setInterval(SetScale, scaleLoopMs);
    };

    module.exports.Init = _init;

})();
