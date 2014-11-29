var main = angular.module("main");
main.controller("LoginController", function($rootScope, $scope, ngDialog, $element, $http, $cookies){
    $scope.signin = function() {
        var login = $scope.login;
        var password = $scope.password;
        Http.signin($scope, $http, login, password);
    };

    $scope.signout = function() {
        Http.signout($http);
    };

    $scope.register = function(){
        ngDialog.open({
            template: 'html/register_dialog.html',
            className: 'ngdialog-theme-default'
        });
    };

    Utilities.applyStylesToHtml($element);
})
