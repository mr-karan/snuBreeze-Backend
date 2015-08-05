angular.module('breeze')
  .controller('AddCtrl', function($scope, $alert, Event,$http,$location,$filter) {
    $scope.message_head = "Register for SNU Breeze 2015 Events here";

    $scope.events = [
      'event 1',
      'event 2',
      'event 3'
    ];

    $http.get('/api/me')
    .success(function(data){
      $scope.user = data;

      console.log(data);
    });

    $scope.addEvent = function() {
      Event.save({
        Name: $scope.user.displayName,
        userEmail:$scope.user.email,
        phoneNum:$scope.user.phoneNum,
        eventName: $scope.eventName
      }).$promise
        .then(function() {
          $scope.eventName = '';
          $scope.Name = '';
          $scope.phoneNum = '';
          $scope.userEmail = '';
          $scope.addForm.$setPristine();
          $location.url('/home');
          $alert({
            content: 'Event has been added.',
            animation: 'fadeZoomFadeDown',
            type: 'info',
            duration: 3
          });
        })
        .catch(function(response) {
          $scope.eventName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'info',
            duration: 3
          });
        });
    };
  });
