
/// <reference path="../_all.d.ts" />

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

var mod;
export function $ng () {
  return mod || (mod = angular.module('client.modaldemo', ['mm.foundation'])
    .controller('ModalDemoCtrl', ['$scope', '$modal', '$log', ($scope, $modal, $log) => new ModalDemoCtrl($scope, $modal, $log)])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', ($scope, $modalInstance, items) => new ModalInstanceCtrl($scope, $modalInstance, items)]));
}