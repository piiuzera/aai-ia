"use strict";

var ChatApi 	= require('../api/ChatApi');
var Express 	= require('express');
var Robot 		= require('../Robot');
var Validator 	= require('validatorjs');

(function() {

	var Router 		= Express.Router();

	var Responses 	= [];

	Router.post('/send', function(request, response) {
		var validation = new Validator(request.body, {
			message		: 'required'
		});

		if (validation.fails()) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Eu sou burra, não entendi, repita por favor ?',
				errors: validation.errors
			});

			return;
		}

		var hash = Math.random().toString(36).slice(2);

		ChatApi.Create(request.body.message, hash, function(send) {
			if (!send.crawl) {
				response.status(200).json({
					res 	: true,
					date 	: new Date(),
					message : send.message,
				});

				return;
			}

			Responses.push({
				hash 		: hash,
				response 	: response
			});
		});
	});

	var _responseText = function(message, hash) {
		for (var i = 0; i < Responses.length; ++i) {
			if (Responses[i] && Responses[i].hash === hash) {
				var send = Robot.GetResponseAddressCommunication(message);
				
				Responses[i].response.status(200).json(send);
				delete Responses[i];
			}
		}
	};

	var _getRouter = function() {
		return Router;
	};

	module.exports.ResponseText 	= _responseText;
	module.exports.GetRouter 		= _getRouter;
})();