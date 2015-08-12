angular.module('breeze')
  .controller('AddCtrl', function($scope, $alert, Event,$http,$location,$filter) {
    $scope.message_head = "Register for SNU Breeze 2015 Events here";
    $scope.clubNames = [
      'SNUPHORIA',
      'INFERNO',
      'WORDS.Ink',
      'IMPRINTS',
      'SIGREE',
      'CINE U',
      'ECONOMICS SOCIETY',
      'Kalakriti',
      'SNU ACM CHAPTER',
      'ORION-SNUCES',
      'FACTION',
      'MUNSOC',
      'RoboYantriki',
      'The Mechanical Society',
      'SNU-IEEE'
    ];

    var eventlist = [
      
        ["Armonia: Solo Singing Competition","Crescendo: Battle of Bands","Acoustyx: Acoustic Band Competion"]
      ,
      
        ["Singularity: Solo Dance","Twin Paradox: Dual Dance","Time Warpers: Group Dance"],
        ['Treasure Hunt: Time Quest','Debate: War of Words','Creative Writing: Tempus Fugit'],
        ['Aagaz','The Dumb Show','Dialoguebaazi'],
        ['Pumperfection','Drink and Drive','Street Feast'],
        ['Time Wreck'],
        ['Casino Royale','This is Trading','Stock Market'],
        ['Fashion Fiesta','Play with Clay','Filmistaan'],
        ['Hackathon','Code Debugging','Coding Championship'],
        ['Cantilivo','Intelligence: Civil Engineering Quiz'],
        ['Retro Quiz','The X-Factor Quiz','Online Quiz'],
        ['MUN 2050'],
        ['Sands of Time','Robo-Combat','Future Drive'],
        ['Assemble It','Design Smackdown','Robo-Combat'],
        ['Analogue Maker','Wire-o-logy']
    ];

    $scope.onchange = function() {
      var key = $scope.clubNames.indexOf($scope.clubName);
      $scope.events = eventlist[key];
    };
    

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
