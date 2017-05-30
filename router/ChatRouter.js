"use strict";

var ChatApi 	= require('../api/ChatApi');
var Express 	= require('express');
var Validator 	= require('validatorjs');

var self = this;

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

		Responses.push({
			hash 		: '',
			response 	: response
		});
	});

	var _getRouter = function() {
		return Router;
	};

	self.GetRouter = _getRouter;
})();