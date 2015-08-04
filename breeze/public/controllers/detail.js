angular.module('breeze')
  .controller('DetailCtrl', function($scope,$http, Event) {
    $scope.headingTitle = "SNU Breeze 2015 Events";
    $http.get('/api/events')
        .success(function(data) {
            $scope.ex = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  });
