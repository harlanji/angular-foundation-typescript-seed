/// <reference path="_all.d.ts" />


export interface Alert {
  type?: string;
  msg: string;
}

export interface IAlertDemoScope extends ng.IScope {
  alerts: Alert[];

  addAlert: Function;
  closeAlert: Function;

}

export class AlertDemoCtrl {
  constructor ($scope: IAlertDemoScope) {
    $scope.alerts = [
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      { type: 'success round', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({msg: "Another alert!"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }  
}

var mod;
export function $ng () {
  console.log('alertdemo.$ng()');
  if (!mod) {
    console.log('alertdemo.$ng() new');
  }
  return mod || (mod = angular.module('client.alertdemo', ['mm.foundation'], [function () { console.log('configuring client.alertdemo'); }])
    .controller('AlertDemoCtrl', ['$scope', ($scope) => new AlertDemoCtrl($scope)]));
}