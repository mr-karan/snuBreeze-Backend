angular.module('breeze')
  .controller('AddCtrl', function($scope, $alert, Event) {
    $scope.addEvent = function() {
      Event.save({ eventName: $scope.eventName }).$promise
        .then(function() {
          $scope.eventName = '';
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