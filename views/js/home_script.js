var app=angular.module("home",[]);


app.factory('socket', function ($rootScope) {
	var socket = io.connect("http://127.0.0.1:81/");
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
			  		callback.apply(socket, args);
				});
		  	});
		},
		emit: function (eventName, data, callback) {
			console.log("good");
		  	socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
			  		if (callback) {
						callback.apply(socket, args);
			  		}
				});
		  	})
		}
  	};
});
/*
	Making service to run ajax
*/
app.service('runajax', ['$http', function ($http) {
  this.runajax_function = function(request,callback){
	var url=request.url;
	var data_server=request.data_server;
	$http.post(url,data_server).success(function(data, status, headers, config) {
	  callback(data);
	})
	.error(function(){
	  callback("data");
	});
  }
}]);
app.controller('home_cntrl', function ($scope,$location,$window,$timeout,socket,runajax,$http) {
socket.on("connect",function (){
console.log("connect listen");

	socket.on('UsersData', function (arguments) {
	$scope.mydata=arguments;
console.log(arguments);
	});
});

$scope.clickHandler = function(data) {
localStorage.setItem('testObject', JSON.stringify(data));
          $window.location.href = "/page1#?id="+data.id;
          $scope.LoginAlert = false;
        };



});
