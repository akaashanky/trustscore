angular.module('turboscoreApp').factory('Signup', function($resource) {
  return $resource('/api/signups/:id'); // Note the full endpoint address
});