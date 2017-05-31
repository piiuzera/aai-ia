angular.module('App')
	.controller('ChatController', ['$scope', 'Chat',
		function($scope, Chat) {

		$scope.messages = [];

		var _sendMessage = function() {
			if (!$scope.message) {
				return;
			}

			var message = {
				date 	: new Date(),
				message	: $scope.message,
				robot 	: false,
				isSend 	: false
			};

			delete $scope.message;
			$scope.messages.unshift(message);

			Chat.Send(message).then(
				CheckSendMessage.bind(this, message),
				CheckSendMessage.bind(this, message)
			);
		};

		var CheckSendMessage = function(message, response) {
			var data = response.data;

			var responseMessage = {
				date 	: data.date,
				robot	: true,
				message : data.message
			};

			$scope.messages.unshift(responseMessage);

			message.isSend = true;
		}

		var _getMessages = function() {

		};

		var SetMessages = function(response) {

		};

		var _init = function() {
			var message = {
				date: new Date(),
				robot	: true,
				message: 'Olá, meu nome é Dilma. Me diz um endereço ai...',
			};

			$scope.messages.unshift(message);
		};

		$scope.SendMessage 	= _sendMessage;
		$scope.Init 		= _init;
}])