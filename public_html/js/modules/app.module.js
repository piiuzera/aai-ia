angular.module('App', ['ngRoute', 'ngSanitize']);

angular.module('App').config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

angular.module('App').config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'views/index.view.html',
		controller 	: 'IndexController'
	})
	.when('/chat', {
		templateUrl	: 'views/chat.view.html',
		controller 	: 'ChatController'
	})
	.otherwise({
		redirectTo: '/'
	});
});