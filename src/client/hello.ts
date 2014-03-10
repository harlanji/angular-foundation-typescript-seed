/// <reference path="_all.d.ts" />

export interface IHelloScope {
  greeting: string;
  name: string;
}

export class HelloCtrl {
  constructor($scope: IHelloScope) {
    $scope.greeting = 'Hello';
    $scope.name = 'WorldTS';
  }
}

var mod : ng.IModule;
export function $ng () {
  return mod || (mod = angular.module('client.hello', [])
    .controller('HelloCtrl', ['$scope', ($scope) => new HelloCtrl($scope)]));
}