"use strict";

var colors = require('colors');

colors.setTheme({
    success	: 'green',
    info 	: 'gray',
    error 	: 'red'
});

exports.error = function(message) {
    if (typeof message === 'object') {
        console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.error('[ERROR ] '));
        console.log(message);
        return;
    }
    console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.error('[ERROR ] ') + message);
};

exports.info = function(message) {
    if (typeof message === 'object') {
        console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.info('[ INFO ] '));
        console.log(message);
        return;
    }

    console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.info('[ INFO ] ') + message);
};

exports.success = function(message) {
    if (typeof message === 'object') {
        console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.success('[SUCESS] '));
        console.log(message);
        return;
    }

    console.log(colors.success('[ FORK: ' + process.pid + ' ]') + colors.success('[SUCESS] ') + message);
};

exports.clearLine = function() {
    console.log(' ');
    console.log(colors.magenta('----------------------------------'));
    console.log(' ');
};
