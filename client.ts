/// <reference path="typings/angularjs/angular.d.ts" />

function HelloCtrl ($scope: ng.Scope) {
  $scope.greeting = 'Hello';
  $scope.name = 'WorldTS';
}

module.exports = {
  HelloCtrl: HelloCtrl
}