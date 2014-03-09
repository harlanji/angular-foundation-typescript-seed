/// <reference path="/root/p/foundation-angular-typescript-seed/typings/angularjs/angular.d.ts" />


var clientModule = angular.module('client', ['mm.foundation']);


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

export interface IAlertDemoScope extends ng.IScope {
  alerts: Object[];

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

export interface IModalDemoScope extends ng.IScope {
  items: string[];
  open: Function;
  selected: string;
}


export class ModalDemoCtrl {
  constructor ($scope: IModalDemoScope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function () {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
}

export interface IModalInstanceScope extends ng.IScope {
  items: string[];
  selected: {item: string};

  ok: Function;
  cancel: Function;
}

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
export class ModalInstanceCtrl {
  constructor ($scope: IModalInstanceScope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
}


clientModule
  .controller('HelloCtrl', HelloCtrl)
  .controller('AlertDemoCtrl', AlertDemoCtrl)
  .controller('ModalDemoCtrl', ModalDemoCtrl)
  .controller('ModalInstanceCtrl', ModalInstanceCtrl)
  ;
