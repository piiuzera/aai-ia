angular.module('App')
	.directive('ngScrollBottom', ['$timeout',
		function ($timeout) {
		return {
			scope: {
				ngScrollBottom: "="
			},
			link: function ($scope, $element) {
				$scope.$watchCollection('ngScrollBottom', function (newValue) {
					if (newValue) {
						$timeout(function() {
							$element.scrollTop($element[0].scrollHeight);
						}, 0);
					}
				});
			}
		}
}]);