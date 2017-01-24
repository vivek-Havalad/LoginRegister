var app = angular.module('register',[]);

app.controller('register', function ($scope,$http,$timeout,$window) {
  $scope.RegisterAlert=true;
  $scope.RegisterBox=false;
  $scope.toggle_login = function() {
      $window.location.href = "/";
  };
  var TypeTimer;
  var TypingInterval = 1000;
  $scope.register = function(){
          var fd = new FormData();
          fd.append('username',$scope.username);
          fd.append('password',$scope.password);
          fd.append('email',$scope.email_id);
          $http.post("/register", fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(function(data, status, headers, config) {
              if(data.is_logged){
                  $scope.LoginAlert = true;
                  $window.location.href = "/home#?id="+data.id;
                  console.log("cool");
              }else{
                  $scope.LoginAlert = false;
              }
          })
          .error(function(){
              alert("Connection Error");
          });

  };


$scope.keyup_uncheck = function() {
    $timeout.cancel(TypeTimer);
    TypeTimer=$timeout( function(){
        var data={
            username:$scope.username
        }
        etc_function.check_username(data);
    }, TypingInterval);
};
$scope.keydown_uncheck = function(){
    $timeout.cancel(TypeTimer);
};

$scope.blur_uncheck = function(){
    var data={
        username:$scope.username
    }
    etc_function.check_username(data);
    $timeout.cancel(TypeTimer);
};

/* Making Extra function*/
var etc_function={
    check_username:function(data){
        $http.post('/check_name',data).success(function(data, status, headers, config) {
            if( !data.msg ){
                $scope.RegisterAlert = true;
            }else{
                $scope.RegisterAlert = false;
            }
        }).error(function(data, status) {
            alert("Connection Error");
        });
    }
}
});
