"use strict";

(function() {

	var _address = null;

	var _addresses = null;

	var _getDefaultAddress = function() {
		return {
			street		: '',
			district	: '',
			city		: '',
			state		: '',
			zipcode		: ''
		};
	};

	var _baseUrl 		 = 'http://www.buscacep.correios.com.br/'; 
	var _urlIndexSearch  = _baseUrl + 'sistemas/buscacep/';
	var _urlResultSearch = _baseUrl + 'sistemas/buscacep/resultadoBuscaCepEndereco.cfm';

	module.exports.Address 					= _address;
	module.exports.Addresses 				= _addresses;
	module.exports.GetDefaultAddress		= _getDefaultAddress;
	module.exports.BaseUrl					= _baseUrl;
	module.exports.UrlIndexSearch			= _urlIndexSearch;
	module.exports.UrlResultSearch			= _urlResultSearch;

})();