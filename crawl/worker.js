"use strict";

var Cheerio 	= require('cheerio');
var Log 		= require('./worker/log');
var Structure 	= require('./worker/structure');
var Web 		= require('./worker/web');

var isReady = true;

var startCrawlLoop = {};
var startCrawlLoopMs = 1000;

var handleMessage = function(message) {
	if (!message.command) {
		return;
	}

	if(message.command === 'setZipcode') {
		setZipcode(message.data.zipcode);

		return;
	}
};
process.on('message', handleMessage);

var startCrawl = function() {
	if (!isReady) {
		return;
	}

	if (!Structure.Address || !Structure.Address.zipcode) {
		getZipcode();

		return;
	}

	isReady = false;
	getSearchAddress();
};

var getZipcode = function() {
	process.send({
		pid		: process.pid,
		command	: 'getZipcode'
	});
};

var setZipcode = function(zipcode) {
	if(!zipcode) {
		Log.info('ZIPCODE IS A NOT FOUND');
		return;
	}

	Structure.Address = Structure.getDefaultAddress();
	Structure.Address.zipcode = zipcode;
};

var getSearchAddress = function() {
	var request = {
		'relaxation'	: Structure.Address.zipcode,
		'tipoCEP'		: 'ALL',
		'semelhante'	: 'N'
	};

	Log.info('SEARCH ZIPCODE STARTED');

	Web.post(
		Structure.urlResultSearchZipcode,
		request,
		setSearchAddress
	);
};

var setSearchAddress = function(body, status) {
	var $ = Cheerio.load(body);

	console.log($.html());

	if (status !== 200 || !body) {
		Log.error('SEARCH ZIPCODE HAS ERROR');

		getNext();
		return;
	}

	var $ = Cheerio.load(body);

	if ($('.ctrlcontent > p').text() === 'DADOS NAO ENCONTRADOS') {
		Log.error('ZIPCODE HAS INVALID');

		getNext();

		return;
	}

	var columns = $('.tmptabela > tr > td');

	var splitCityState = $(columns.get(2)).text().trim().split('/');

	Structure.Address.street 	= $(columns.get(0)).text().trim();
	Structure.Address.district 	= $(columns.get(1)).text().trim();
	Structure.Address.city 		= splitCityState[0];
	Structure.Address.state		= splitCityState[1];
	Structure.Address.zipcode 	= $(columns.get(3)).text().trim();

	Log.info(Structure.Address);

	Log.info('SEARCH ZIPCODE SUCCESS');

	save();
};

var getNext = function() {
	Structure.Address = null;
	isReady = true;
};

var save = function() {
	Log.info('SAVING ADDRESS');

	process.send({
		command	: 'setAddress',
		data 	: {
			address: Structure.Address
		}
	});

	getNext();
};

var init = function() {
	startCrawl();
	startCrawlLoop = setInterval(startCrawl, startCrawlLoopMs);
};

init();