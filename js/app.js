(function (window) {
	'use strict';
	var app = angular.module('myApp', []);
	app.controller('myCtrl', function ($scope, $filter) {
		//showList
		$scope.todoList = [
			{txt: 'html', completed: true},
			{txt: 'java', completed: true},
			{txt: 'php', completed: false},]
		//add
		$scope.todo = '';
		$scope.add = function () {
			if ($scope.todo != '') {
				$scope.todoList.push({txt: $scope.todo, completed: false});
				$scope.todo = '';
			}
		}
		//delete
		$scope.destroy = function (todo) {
			var index = $scope.todoList.indexOf(todo);
			$scope.todoList.splice(index, 1);
		}
		//edit
		$scope.edit = {};
		$scope.editing = function (todo) {
			$scope.edit = todo;
		}
		$scope.editOver = function () {
			$scope.edit = {}
		}
		$scope.item = 0;
		$scope.checkAll = false;
		$scope.clearAll = true;
		$scope.$watch('todoList', function () {
			$scope.item = $filter('filter')($scope.todoList, {completed: false}).length;
			$scope.checkAll = !$scope.item;
			$scope.clearAll = !!$filter('filter')($scope.todoList, {completed: true}).length;
		}, true)
		//chooseAll
		$scope.chooseAll = function () {
			$scope.todoList.forEach(function (item) {
				item.completed = $scope.checkAll;
			});
		}
		//clear-completed
		$scope.clearCompleted = function () {
			$scope.todoList = $filter('filter')($scope.todoList, {completed: false})
		}
		//checkStatus
		$scope.status = {}
		$scope.checkStatus = function (status) {
			switch (status) {
				case 'All':
					$scope.status = {};
					break;
				case 'active':
					$scope.status = {completed: false};
					break;
				case 'completed':
					$scope.status = {completed: true};
					break;
			}
		}
	})
})(window);
