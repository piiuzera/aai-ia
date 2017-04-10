"use strict";

var colors = require('colors');

colors.setTheme({
    success: 'blue',
    info: 'gray',
    error: 'red',
    worker: 'cyan'
});

exports.error = function(message) {
    if (typeof message === 'object') {
        console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.error('[ERROR ] ') + JSON.stringify(message));
        return;
    }
    console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.error('[ERROR ] ') + message);
};

exports.info = function(message) {
    if (typeof message === 'object') {
        console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.info('[ INFO ] ') + JSON.stringify(message));
        return;
    }

    console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.info('[ INFO ] ') + message);
};

exports.success = function(message) {
    if (typeof message === 'object') {
        console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.success('[SUCESS] ') + JSON.stringify(message));
        return;
    }

    console.log(colors.worker.underline('[ WORKER: ' + process.pid + ' ]') + colors.success('[SUCESS] ') + message);
};

exports.clearLine = function() {
    console.log(' ');
    console.log(colors.magenta('----------------------------------'));
    console.log(' ');
};
