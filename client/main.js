var app = angular.module("myApp", ["ngRoute"]);

//Define routes
app.config(function($routeProvider){
   $routeProvider
      .when("/players", {
         templateUrl: "static/partials/players.html"
      })
      .when("/teams", {
         templateUrl: "static/partials/teams.html"
      })
      .when("/associations", {
         templateUrl: "static/partials/associations.html"
      })
      .otherwise({
         redirectTo: "/users"
      });
})

app.factory("playerFactory",[function(){
   var factory = {};

   //Initialize our list of users
   var players = [
      {firstName: "Yukihiro"},
      {firstName: "Ryan"},
      {firstName: "Brendan"}
   ];


   //Pass the user list to a controller
   factory.index = function(callback){
      callback(players);
   }

   //Add new user to the list
   factory.create = function(player){
      players.push(player);
   }

   //Remove the user from the list
   factory.delete = function($index){
      players.splice($index, 1);
   }
   return factory;
}])

app.factory("teamFactory",[function(){
   var factory = {};

   //Initialize our list of users
   var teams = [
      {Name: "Yukihiro"},
      {Name: "Ryan"},
      {Name: "Brendan"}
   ];


   //Pass the user list to a controller
   factory.index = function(callback){
      callback(teams);
   }

   //Add new user to the list
   factory.create = function(team){
      teams.push(team);
   }

   //Remove the user from the list
   factory.delete = function($index){
      teams.splice($index, 1);
   }
   return factory;
}])
//Inject userFactory into each controller
app.controller("CustomizeplayerController", ['$scope', 'playerFactory', function($scope, playerFactory){
   function setUsers(data){
      $scope.players = data;
      $scope.newPlayer = {};
   }

   $scope.players = [];

   //When this controller is loaded, fetch the user list
   playerFactory.index(setPlayers);

   //Pass new user info to the factory
   $scope.create = function(){
      playerFactory.create($scope.newPlayer)
      $scope.newPlayer = {}; //Reset our form
   }

   //Delegate deleting user to the factory
   $scope.delete = function($index){
      playerFactory.delete($index);
   }
}])

//Inject userFactory into each controller
app.controller("UserListsController",['$scope', 'playerFactory', function($scope, playerFactory){
   function setPlayers(data){
      $scope.players = data;
   }

   $scope.players = [];

   //When this controller is loaded, fetch the user list
   playerFactory.index(setPlayers);
}])