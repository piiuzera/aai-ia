"use strict";

var Log		= require('./log');

var addresses = [];

var zipcodes = [];

var get = function() {
	return zipcodes.shift();
};

var set = function(address) {
	if (!address || !address.street || !address.district || !address.city) {
		return;
	}

	Fs.writeFile(
		'./files/' + address.zipcode + '.json',
		JSON.stringify(address),
		checkSaveFile
	);

	addresses.push(address);
};

var checkSaveFile = function(error) {
	if (error) {
		Log.error('ERROR SAVE FILE');

		return;
	}

	Log.info('ADDRESS SAVED SUCCESS');
};

var getLength = function() {
	return zipcodes.length;
};

var init = function() {
	getZipcode();
};

exports.getZipcode 			= getZipcode;
exports.get 				= get;
exports.set 				= set;
exports.getLength 			= getLength;
exports.init				= init;