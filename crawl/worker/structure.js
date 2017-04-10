"use strict";

var Address = null;

var getDefaultAddress = function() {
	return {
		street		: '',
		district	: '',
		city		: '',
		state		: '',
		zipcode		: ''
	};
};

var urlResultSearchZipcode = 'http://www.buscacep.correios.com.br/sistemas/buscacep/resultadoBuscaCepEndereco.cfm';

exports.Address 				= Address;
exports.getDefaultAddress		= getDefaultAddress;

exports.urlResultSearchZipcode	= urlResultSearchZipcode;