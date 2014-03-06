function HelloCtrl ($scope) {
  $scope.greeting = 'Hello';
  $scope.name = 'World';
}

module.exports = {
  HelloCtrl: HelloCtrl
}