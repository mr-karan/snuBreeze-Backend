angular.module('breeze')
      .controller('NavbarCtrl', function($scope, $auth) {
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };
      });
