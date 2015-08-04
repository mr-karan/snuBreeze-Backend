angular.module('breeze')
  .factory('Event', function($resource) {
    return $resource('/api/events/:_id');
  });
