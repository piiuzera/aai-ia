angular.module('App')
	.directive('ngEnter', [
		function() {

			var _link = function(scope, elements, attrs) {
				elements.bind('keydown keypress', function (event) {
					if (event.which === 13) {
						scope.$apply(function () {
							scope.$eval(attrs.ngEnter);
						});
						event.preventDefault();
					}
				});
			};

			return {
				link: _link
			};

}]);