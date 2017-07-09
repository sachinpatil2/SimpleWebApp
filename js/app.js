"use strict";

var app = angular.module('ZeusApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
			      controller: "HomeController"
        })
        .state('addNewUser', {
          url: '/addNewUser',
          templateUrl: 'templates/addNewUser.html',
          controller: "AddNewUserController"
        })
        .state('editUser', {
          url: '/editUser',
          templateUrl: 'templates/editUser.html',
          controller: "EditUserController"
        })
        .state('viewUser', {
          url: '/viewUser',
          templateUrl: 'templates/viewUser.html',
          controller: "ViewUserController"
        });

      $urlRouterProvider.otherwise('/home');
});
