"use strict";

(function() {

	var _address = null;

	var _getDefaultAddress = function() {
		return {
			street		: '',
			district	: '',
			city		: '',
			state		: '',
			zipcode		: ''
		};
	};

	var _urlResultSearchZipcode = 'http://www.buscacep.correios.com.br/sistemas/buscacep/resultadoBuscaCepEndereco.cfm';

	module.exports.Address 					= _address;
	module.exports.GetDefaultAddress		= _getDefaultAddress;
	module.exports.UrlResultSearchZipcode	= _urlResultSearchZipcode;

})();