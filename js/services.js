"use strict";

angular.module('ZeusApp')
    .factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8081';
    var dataFactory = {};

      dataFactory.listUsers = function () {
        return $http.get(urlBase+'/listUsers');
      };

      dataFactory.getUser = function (id) {
          return $http.get(urlBase + '/' + id);
      };

      dataFactory.insertUser = function (user) {
          return $http.post(urlBase+'/addUser', user);
      };

      dataFactory.updateUser = function (user) {
          return $http.put(urlBase + '/updateUser', user)
      };

      dataFactory.deleteUser = function (id) {
          return $http.delete(urlBase + '/' + id);
      };
    return dataFactory;
}]);
