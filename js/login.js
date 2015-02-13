var main = angular.module("main");
main.controller("LoginController", function(
    $location, $rootScope, $scope, $timeout, $element, $http, $cookies){
    $scope.signin = function() {
        var login = $scope.login;
        var password = $scope.password;
        $scope.loginLoading = true;

        Http.signin($scope, $timeout, $http, login, password, {
            error: function(data){
                $scope.errorMessage = data.message;
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
