"use strict";

(function() {

	var _zeroComplete = function(str, length) {
		if (str.length > length) {
			return str;
		}

		var zeroCount = '';

		for (var i = 0; i < (length - str.length); ++i) {
			zeroCount += '0';
		}

		return zeroCount + str;
	};

	var _numberOnly = function(str) {
		var strResult = '';
		for (var i = 0; i < str.length; ++i) {
			if ( !isNaN(str[i]) ) {
				strResult += str[i];
			}
		}

		return strResult;
	};

	module.exports.ZeroComplete 	= _zeroComplete;
	module.exports.NumberOnly 	 	= _numberOnly;

})();