"use strict";

var JsonFile = require('jsonfile');

(function() {
	var _sendMessage = function(message, callback) {
		var send = null;

		send = GetRequestAddressComunication(message);

		if (!send) {
			send = GetInitialCommunication(message);
		}

		callback(send);
	};

	var GetRequestAddressComunication = function(message) {
		var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(message);
		var send = null;

		if (matches) {
			send = {
				response: true,
				crawl	: true,
				message : matches[1]
			};
		}

		return send || null;
	};

	var GetInitialCommunication = function(message) {
		var initial = JsonFile.readFileSync('./files/Initial.json');

		for (var i = 0; i < initial.length; ++i) {
			var messages = initial[i].messages;
			if (!messages) {
				var error = JsonFile.readFileSync('./files/Error.json');
				error.push(message);

				JsonFile.writeFileSync('./files/Error.json', error);

				return {
					response: true,
					crawl	: false,
					message : initial[i].response
				};
			}

			for (var j = 0; j < messages.length; ++j) {
				if (message.toUpperCase().indexOf(messages[j]) !== -1) {
					return {
						response: true,
						crawl	: false,
						message : initial[i].response
					};
				}
			}
		}
	};

	var _getResponseAddressCommunication = function(data) {
		var str = '<br />';

		if (!data) {
			return {
				response: true,
				crawl	: false,
				message : "Viiiixy, Não achei nada relacionado!"
			};
		}

		if (data.length) {
			for (var i = 0; i < data.length; ++i) {
				str += '[Logradouro - ' + data[i].street 	+ ", " +
					   'Bairro - ' + data[i].district  + ", " +
					   'Cidade - ' + data[i].city  	+ ", " +
					   'Estado - ' + data[i].state  	+ ", " +
					   'Cep - ' + data[i].zipcode  	+ "]<br />";
			}

			return {
				response: true,
				crawl	: false,
				message : "Eu tenho estes endereços pra você, olha se é algum:" + str
			};
		} else {
			str += '[Logradouro - ' + data.street 	+ ", " +
				   'Bairro - ' + data.district  + ", " +
				   'Cidade - ' + data.city  	+ ", " +
				   'Estado - ' + data.state  	+ ", " +
				   'Cep - ' + data.zipcode  	+ "]<br />";

			return {
				response: true,
				crawl	: false,
				message : "Seria este endereço:" + str
			};
		}
	};

	module.exports.SendMessage 						= _sendMessage;
	module.exports.GetResponseAddressCommunication 	= _getResponseAddressCommunication;

})();