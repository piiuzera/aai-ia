angular.module('App')
	.controller('ChatController', ['$scope',
		function($scope) {

		$scope.messages = [];

		var _sendMessage = function() {
			if (!$scope.message) {
				return;
			}

			var message = {
				hash: Math.random().toString(36).slice(2),
				date: new Date(),
				text: $scope.message,
				isSend: false
			};

			$scope.messages.push(message);

			setTimeout(
				CheckSendMessage.bind(this, message),
				3000
			);

			delete $scope.message;
		};

		var CheckSendMessage = function(message, response) {
			message.isSend = true;
		}

		var _getMessages = function() {

		};

		var SetMessages = function(response) {

		};

		var _init = function() {
			var message = {
				date: new Date(),
				text: 'Olá, meu nome é Dilma. Me diz um endereço ai...',
			};

			$scope.messages.push(message);
		};

		$scope.SendMessage 	= _sendMessage;
		$scope.Init 		= _init;
}])