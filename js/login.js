var main = angular.module("main");
main.controller("LoginController", function($rootScope, $scope, $timeout, $element, $http, $cookies){
    $scope.signin = function() {
        var login = $scope.login;
        var password = $scope.password;
        Http.signin($scope, $timeout, $http, login, password);
    };

    $scope.signout = function() {
        Http.signout($http);
    };

    Utilities.applyStylesToHtml($element);
})
