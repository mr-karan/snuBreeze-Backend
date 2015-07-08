angular.module('breeze')
  .controller('AddCtrl', function($scope, $alert, Event) {
    $scope.addEvent = function() {
      Event.save({ eventName: $scope.eventName,userEmail:$scope.userEmail,Name:$scope.Name,phoneNum:$scope.phoneNum }).$promise
        .then(function() {
          $scope.eventName = '';
          $scope.Name = '';
          $scope.phoneNum = '';
          $scope.userEmail = '';
          $scope.addForm.$setPristine();
          $alert({
            content: 'Event has been added.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $scope.eventName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });