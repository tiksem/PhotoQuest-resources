var main = angular.module("main");
main.controller("LoginController", function(
    $location, $rootScope, $scope, $timeout, $element, $http, $cookies){
    var tr = $scope.tr;

    $scope.signin = function() {
        var login = $scope.login;
        var password = $scope.password;
        $scope.loginLoading = true;

        Http.signin($scope, $timeout, $http, login, password, {
            error: function(data){
                if (data.error = "LoginFailedException") {
                    $scope.errorMessage = tr.loginFailed;
                } else {
                    $scope.errorMessage = tr.unknownError;
                }
            },
            finished: function() {
                $scope.loginLoading = false;
            },
            success: function() {
                $scope.errorMessage = "";
            }
        });
    };

    $scope.signout = function() {
        Http.signout($http);
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
})
