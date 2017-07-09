"use strict";

angular.module('ZeusApp')
.controller('HomeController', ['$scope', '$state', 'dataFactory', '$rootScope',function($scope,$state,dataFactory,selectedUserId,$rootScope) {
  console.log("inside HomeController");
  if(localStorage.getItem("selectedId") == null || localStorage.getItem("selectedId") == undefined)
    localStorage.setItem('selectedId',0);
  listUsers();
  function listUsers(){
          dataFactory.listUsers()
            .then(function (response) {
                       console.log("Data: ",response.data);
                       $scope.data = response.data;
                   }, function (error) {
                       $scope.status = 'Unable to load user data: ' + error.message;
                   });
  }
    $scope.setDeleteUserId = function(id){
      $scope.currentDeleteUserId = id;
    }
    $scope.deleteUser = function(){

      var id = $scope.currentDeleteUserId;
      dataFactory.deleteUser(id)
      .then(function (response) {
                 console.log("Data: ",response.data);
                 listUsers();
                 //$scope.data = response.data;
             }, function (error) {
                 $scope.status = 'Unable to load user data: ' + error.message;
             });
    }
    $scope.viewUser = function(id){
      localStorage.setItem('selectedId',id);
      // $rootScope.selectedId = id;
      console.log("viewUser function : "+selectedUserId);
      $state.go('viewUser');
    }
    $scope.editUser = function(id){
      localStorage.setItem('selectedId',id);
      // $rootScope.selectedId = id;
      $state.go('editUser');
    }

}])
.controller('AddNewUserController',function($scope,$state,dataFactory){
  console.log("sachin");
  $scope.user={};
  var dob = new Date();
  var temp = dob;
  $scope.userTypes = ["SuperAdmin","CityAdmin","Customer"];
  $scope.userStatusTypes = ["Active","Inactive","Archive"];
  $scope.saveUserInfo = function(){
    console.log("user:",$scope.user);
    if(dob != temp)
      $scope.user.dob = dob.toDateString();
    else
      $scope.user.dob = "NA";
    $scope.user.fullName = $scope.user.firstName+' '+$scope.user.lastName;
    dataFactory.insertUser($scope.user)
        .then(function (response) {
               //listUsers();
               console.log("response after adding: ",response);
               $state.go('home');
           }, function (error) {
               $scope.status = 'Unable to insert user data: ' + error.message;
           });

  }
  $scope.cancel = function(){
    $state.go('home');
  }

})
.controller('EditUserController',function($scope,dataFactory,$rootScope,$state){
  console.log("inside EditUserController..");
  $scope.userTypes = ["SuperAdmin","CityAdmin","Customer"];
  $scope.userStatusTypes = ["Active","Inactive","Archive"];
  // localStorage.setItem('selectedId');
  var selectedId = localStorage.getItem("selectedId");
  $scope.cancel = function(){
    $state.go('home');
  }
  if(selectedId != null){
    dataFactory.getUser(selectedId)
      .then(function (response) {
               console.log("getUser Data: ",response.data);
               $scope.user = response.data[0];
               //listUsers();
               //$scope.data = response.data;
           }, function (error) {
               $scope.status = 'Unable to load user data: ' + error.message;
           });
  }else $state.go("home");
  $scope.updateUser = function(){
    console.log("inside updateuser");
    dataFactory.updateUser($scope.user)
      .then(function (response) {
               console.log("updateuser Data: ",response.data);
               $state.go("home");
               //listUsers();
               //$scope.data = response.data;
           }, function (error) {
               $scope.status = 'Unable to load user data: ' + error.message;
           });
  }

})
.controller('ViewUserController',[ '$scope','dataFactory','$rootScope',function($scope,dataFactory,selectedUserId,$rootScope){
  console.log("viewUser controller : "+selectedUserId);
  dataFactory.getUser(localStorage.getItem("selectedId"))
    .then(function (response) {
             console.log("getUser Data: ",response.data);
             $scope.viewData = response.data[0];
             //listUsers();
             //$scope.data = response.data;
         }, function (error) {
             $scope.status = 'Unable to load user data: ' + error.message;
         });
  //console.log("sachin");
}]);
