var app = angular.module('login-register',[]);

/*creating Directive to Upload file starts*/

/*creating Directive to Upload file ends*/

app.controller('login-register', function ($scope,$http,$timeout,$window) {

    /* variables for  Hide show starts*/
    $scope.LoginBox=false;
    $scope.LoginAlert=true;

    /* variables for  Hide show ends*/

    /* usernamme check variables starts*/
    var TypeTimer;
    var TypingInterval = 1000;
    /* usernamme check variables ends*/


    /* Hide show Login and Registration box  starts */
    $scope.toggle_register = function() {
        $window.location.href = "/register#";
    };

    /* Hide show Login and Registration box ends*/


    /* Login operation starts*/
    $scope.login = function(){
        var data={
            username:$scope.username,
            password:$scope.password
        }

        $http.post('/login',data).success(function(data, status, headers, config) {
            if(data.is_logged){
                $scope.LoginAlert = true;
                $window.location.href = "/home#?id="+data.id;
            }else{
                $scope.LoginAlert = false;
            }
        }).error(function(data, status) {
            alert("Connection Error");
        });
    };
    /* Login operation ends*/



    /* usernamme check operation starts*/
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
    /* usernamme check operation ends*/


    /* Regsiter operation starts*/

    /* Regsiter operation ends*/


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
