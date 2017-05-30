angular.module('App')
	.controller('IndexController', ['$scope',
		function($scope) {

			$scope.disciplina = {};

			$scope.alunos = [];

			var _init = function() {
				$scope.disciplina.nome 		= 'Atividade Autoinstrucional - Inteligência Artificial';
				$scope.disciplina.professor = 'Luiz Cláudio Gomes Maia';

				$scope.alunos.push("Gabriel Barbosa");
				$scope.alunos.push("Gustavo Candioto");
				$scope.alunos.push("Luiz Paulo da Silva");
				$scope.alunos.push("Matheus Neiva Amaro");
				$scope.alunos.push("Tharyck Gusmão");
			};

			$scope.Init = _init;
}]);