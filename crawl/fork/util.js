"use strict";

var zeroComplete = function(str, length) {
	if (str.length > length) {
		return str;
	}

	var zeroCount = '';

	for (var i = 0; i < (length - str.length); ++i) {
		zeroCount += '0';
	}

	return zeroCount + str;
};

exports.zeroComplete = zeroComplete;