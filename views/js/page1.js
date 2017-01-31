
var app=angular.module("Page1",[]);

app.controller('Page_cntrl',function ($scope,$location,$window,$timeout,$http) {
var retrievedObject = localStorage.getItem('testObject');
 retrievedObject=JSON.parse(retrievedObject);
 console.log(retrievedObject);
	$scope.mydata=retrievedObject;
});
