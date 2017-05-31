"use strict";

var Cheerio 	= require('cheerio');
var Html		= require('htmlencode');
var Log 		= require('./worker/Log');
var Structure 	= require('./worker/Structure');
var Web 		= require('./worker/Web');

(function() {

	var isReady = true;

	var startCrawlLoop = {};
	var startCrawlLoopMs = 500;

	var objCrawl = null;

	var handleMessage = function(message) {
		if (!message.command) {
			return;
		}

		if(message.command === 'SetCrawl') {
			SetCrawl(message.data.crawl);

			return;
		}
	};

	var StartCrawl = function() {
		if (!isReady) {
			return;
		}

		if (!objCrawl) {
			GetCrawl();

			return;
		}

		isReady = false;
		GetSearchAddress();
	};

	var GetCrawl = function() {
		process.send({
			pid		: process.pid,
			command	: 'GetCrawl'
		});
	};

	var SetCrawl = function(crawl) {
		if(!crawl) {
			return;
		}

		objCrawl = crawl;
	};

	var GetSearchAddress = function(nextPage) {
		var request = nextPage ? nextPage : {
			'relaxation'	: objCrawl.message,
			'tipoCEP'		: 'ALL',
			'semelhante'	: 'N'
		};

		Log.Info('SEARCH TEXT CRAWL STARTED');

		Web.Post(
			nextPage && nextPage.url ? (Structure.BaseUrl + nextPage.url) : Structure.UrlResultSearch,
			request,
			SetSearchAddress
		);
	};

	var SetSearchAddress = function(body, status) {
		if (status !== 200 || !body) {
			Log.Error('SEARCH TEXT CRAWL HAS ERROR');

			Send();
			return;
		}

		var $ = Cheerio.load(body);

		if ($('.ctrlcontent > p').text() === 'DADOS NAO ENCONTRADOS') {
			Log.Error('TEXT CRAWL HAS INVALID');

			Send();

			return;
		}

		var rows = $('.tmptabela > tbody > tr');

		if (rows.length > 2) {
			Structure.Addresses = !Structure.Addresses ? [] : Structure.Addresses;

			rows.each(function(index, row) {
				var columns = $(row).find('td');

				var splitCityState 	= $(columns.get(2)).text().trim().split('/');

				var Address 		= Structure.GetDefaultAddress();
				Address.street 		= $(columns.get(0)).text().trim();
				Address.district 	= $(columns.get(1)).text().trim();
				Address.city 		= splitCityState[0];
				Address.state		= splitCityState[1];
				Address.zipcode 	= $(columns.get(3)).text().trim();

				if (Address.street 	&&
					Address.district 	&&
					Address.city 		&&
					Address.state 		&&
					Address.zipcode) {

					Structure.Addresses.push(Address);
				
				}
			});

		} else {
			var columns = $(rows).find('td');

			var splitCityState = $(columns.get(2)).text().trim().split('/');

			Structure.Address 			= Structure.GetDefaultAddress();
			Structure.Address.street 	= $(columns.get(0)).text().trim();
			Structure.Address.district 	= $(columns.get(1)).text().trim();
			Structure.Address.city 		= splitCityState[0];
			Structure.Address.state		= splitCityState[1];
			Structure.Address.zipcode 	= $(columns.get(3)).text().trim();
		}

		Log.Info('SEARCH TEXT CRAWL SUCCESS');

		var nextPage = {
			url 		: $('form[name=\'Proxima\']').attr('action'),
			relaxation 	: objCrawl.message,
			exata	   	: $('form[name=\'Proxima\'] > input[name=\'exata\']').val(),
			semelhante	: $('form[name=\'Proxima\'] > input[name=\'semelhante\']').val(),
			tipoCep 	: $('form[name=\'Proxima\'] > input[name=\'tipoCep\']').val(),
			qtdrow 		: $('form[name=\'Proxima\'] > input[name=\'qtdrow\']').val(),
			pagini 		: $('form[name=\'Proxima\'] > input[name=\'pagini\']').val(),
			pagfim 		: $('form[name=\'Proxima\'] > input[name=\'pagfim\']').val()
		};

		if (nextPage.url 		&&
			nextPage.relaxation &&
			nextPage.exata 		&&
			nextPage.semelhante &&
			nextPage.tipoCep 	&&
			nextPage.qtdrow 	&&
			nextPage.pagini 	&&
			nextPage.pagfim) {

			GetSearchAddress(nextPage);
			return;
		}

		Send();
	};

	var GetNext = function() {
		Structure.Address = null;
		Structure.Addresses = null;
		objCrawl = null;
		isReady = true;
	};

	var Send = function() {
		Log.Info('SEND ADDRESS');

		process.send({
			command	: 'SendAddress',
			data 	: {
				address 	: Structure.Address || null,
				addresses 	: Structure.Addresses || null,
				hash 		: objCrawl.hash
			}
		});

		GetNext();
	};

	var _init = function() {
		process.on('message', handleMessage);

		StartCrawl();
		startCrawlLoop = setInterval(StartCrawl, startCrawlLoopMs);
	};

	module.exports.Init = _init;

})();

this.Init();
