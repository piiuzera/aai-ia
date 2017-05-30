"use strict";

var Cheerio 	= require('cheerio');
var Log 		= require('./worker/Log');
var Structure 	= require('./worker/Structure');
var Web 		= require('./worker/Web');

(function() {

	var isReady = true;

	var startCrawlLoop = {};
	var startCrawlLoopMs = 1000;

	var HandleMessage = function(message) {
		if (!message.command) {
			return;
		}

		if(message.command === 'SetZipcode') {
			SetZipcode(message.data.zipcode);

			return;
		}
	};
	process.on('message', HandleMessage);

	var StartCrawl = function() {
		if (!isReady) {
			return;
		}

		if (!Structure.Address || !Structure.Address.zipcode) {
			GetZipcode();

			return;
		}

		isReady = false;
		GetSearchAddress();
	};

	var GetZipcode = function() {
		process.send({
			pid		: process.pid,
			command	: 'GetZipcode'
		});
	};

	var SetZipcode = function(zipcode) {
		if(!zipcode) {
			Log.info('ZIPCODE IS A NOT FOUND');
			return;
		}

		Structure.Address 			= Structure.getDefaultAddress();
		Structure.Address.zipcode 	= zipcode;
	};

	var GetSearchAddress = function() {
		var request = {
			'relaxation'	: Structure.Address.zipcode,
			'tipoCEP'		: 'ALL',
			'semelhante'	: 'N'
		};

		Log.info('SEARCH ZIPCODE STARTED');

		Web.post(
			Structure.urlResultSearchZipcode,
			request,
			SetSearchAddress
		);
	};

	var SetSearchAddress = function(body, status) {
		if (status !== 200 || !body) {
			Log.error('SEARCH ZIPCODE HAS ERROR');

			GetNext();
			return;
		}

		var $ = Cheerio.load(body);

		if ($('.ctrlcontent > p').text() === 'DADOS NAO ENCONTRADOS') {
			Log.error('ZIPCODE HAS INVALID');

			GetNext();

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

		Save();
	};

	var GetNext = function() {
		Structure.Address = null;
		isReady = true;
	};

	var Save = function() {
		Log.info('SAVING ADDRESS');

		process.send({
			command	: 'SetAddress',
			data 	: {
				address: Structure.Address
			}
		});

		GetNext();
	};

	var _init = function() {
		StartCrawl();
		
		startCrawlLoop = setInterval(
			StartCrawl,
			startCrawlLoopMs
		);
	};

	module.exports.Init = _init;

})();

this.Init();