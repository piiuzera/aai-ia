"use strict";

var ChatApi 	= require('../api/ChatApi');
var Express 	= require('express');
var Validator 	= require('validatorjs');

(function() {

	var Router 		= Express.Router();

	var Responses 	= [];

	Router.post('/send', function(request, response) {
		var validation = new Validator(request.body, {
			message		: 'required',
			hash 		: 'required'
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

		ChatApi.Create(request.body.message);

		Responses.push({
			hash 		: 1,
			response 	: response
		});
	});

	var _responseText = function(message) {
		for (var i = 0; i < Responses.length; ++i) {
			if (Responses[i].hash === 1) {
				Responses[i].status(200).json(message);
			}
		}
	};

	var _getRouter = function() {
		return Router;
	};

	module.exports.ResponseText 	= _responseText;
	module.exports.GetRouter 		= _getRouter;
})();