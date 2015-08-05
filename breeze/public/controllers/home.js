angular.module('breeze')
  .controller('MainCtrl',function($scope,$http, Event,$auth){

    $scope.formData = {};

    /*$scope.getUser = function() {
      $scope.username = $scope.user.displayName;
      $scope.status1 = false;
    };*/
    $scope.userdata= {};
    $scope.status2 = false;
    $scope.status3 = false;
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

      $http.get('/api/me')
        .success(function(data){
          $scope.userdata = data;
          $scope.username = data.displayName;
          $scope.useremail = data.email;
          console.log(data);
        });

    $http.get('/api/events')
        .success(function(data) {/*
          for(i = 0;i<data.length;i++) {
            data[i].travelDate = new moment(data[i].travelDate).format("MMM Do YYYY");
            data[i].travelTime = new moment(data[i].travelTime).format("h:mm a");
          }*/
            $scope.registrations = data;
            //console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


        $scope.deleteRegistration = function(id) {
            $http.delete('/api/events/' + id)
                .success(function(data) {
                  /*for(i = 0;i<data.length;i++) {
                    data[i].travelDate = new moment(data[i].travelDate).format("MMM Do YYYY");
                    data[i].travelTime = new moment(data[i].travelTime).format("h:mm a");

                  }*/
                    $scope.registrations = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };



        /*$scope.getRes = function(id) {
          $scope.status2=false;
          //$scope.status3 = false;
          $http.get('/api/carpooler/'+id)
            .success(function(data) {
              data.travelDate = new moment(data.travelDate).format("MMM Do YYYY");
              data.travelTime = new moment(data.travelTime).format("h:mm a");

              $scope.bookingReference = data;
              console.log("started");
              $scope.status3=true;
              $scope.doSomething();

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //  $scope.status2 = true;
      };*/

        //console.log($scope.bookings);
      //  console.log($scope.bookingResultArray);
        //console.log("success");
        //console.log($scope.distance.length);
        //console.log($scope.status2);
          $scope.status2 = true;



  });
