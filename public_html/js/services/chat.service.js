angular.module('App')
	.service('Chat', ['$http',
		function($http) {

			var _send = function(message) {
				return $http.post('/api/message/send', message);
			};

			return {
				Send : _send
			};
}]);