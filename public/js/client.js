!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.client=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/// <reference path="_all.d.ts" />

var AlertDemoCtrl = (function () {
    function AlertDemoCtrl($scope) {
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success round', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.addAlert = function () {
            $scope.alerts.push({ msg: "Another alert!" });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
    return AlertDemoCtrl;
})();
exports.AlertDemoCtrl = AlertDemoCtrl;

var mod;
function $ng() {
    console.log('alertdemo.$ng()');
    if (!mod) {
        console.log('alertdemo.$ng() new');
    }
    return mod || (mod = angular.module('client.alertdemo', ['mm.foundation'], [function () {
            console.log('configuring client.alertdemo');
        }]).controller('AlertDemoCtrl', ['$scope', function ($scope) {
            return new AlertDemoCtrl($scope);
        }]));
}
exports.$ng = $ng;

},{}],2:[function(_dereq_,module,exports){
/// <reference path="_all.d.ts" />
var hello = _dereq_('./hello');
var alertDemo = _dereq_('./alertdemo');
var modalDemo = _dereq_('./modaldemo/index');

var mod;
function $ng() {
    return mod || (mod = angular.module('client', [hello.$ng().name, alertDemo.$ng().name, modalDemo.$ng().name], [function () {
            console.log('configuring client');
        }]));
}
exports.$ng = $ng;
;

},{"./alertdemo":1,"./hello":3,"./modaldemo/index":4}],3:[function(_dereq_,module,exports){
/// <reference path="_all.d.ts" />
var alertDemo = _dereq_('./alertdemo');

var HelloCtrl = (function () {
    function HelloCtrl($scope) {
        $scope.greeting = 'Hello';
        $scope.name = 'WorldTS';
    }
    return HelloCtrl;
})();
exports.HelloCtrl = HelloCtrl;

var mod;
function $ng() {
    return mod || (mod = angular.module('client.hello', [alertDemo.$ng().name]).controller('HelloCtrl', ['$scope', function ($scope) {
            return new HelloCtrl($scope);
        }]));
}
exports.$ng = $ng;

},{"./alertdemo":1}],4:[function(_dereq_,module,exports){
/// <reference path="../_all.d.ts" />
var ModalDemoCtrl = (function () {
    function ModalDemoCtrl($scope, $modal, $log) {
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
        };
    }
    ModalDemoCtrl.injector = function () {
        return ['$scope'];
    };
    return ModalDemoCtrl;
})();
exports.ModalDemoCtrl = ModalDemoCtrl;

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = (function () {
    function ModalInstanceCtrl($scope, $modalInstance, items) {
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
    return ModalInstanceCtrl;
})();
exports.ModalInstanceCtrl = ModalInstanceCtrl;

var mod;
function $ng() {
    return mod || (mod = angular.module('client.modaldemo', ['mm.foundation']).controller('ModalDemoCtrl', [
        '$scope', '$modal', '$log',
        function ($scope, $modal, $log) {
            return new ModalDemoCtrl($scope, $modal, $log);
        }]).controller('ModalInstanceCtrl', [
        '$scope', '$modalInstance', 'items',
        function ($scope, $modalInstance, items) {
            return new ModalInstanceCtrl($scope, $modalInstance, items);
        }]));
}
exports.$ng = $ng;

},{}]},{},[2])
(2)
});