var main = angular.module("main");
main.controller("HeaderController", function($scope, $location, $element, ngDialog, $http){
    $scope.signout = function() {
        Http.signout($scope, $http);
    };

    Utilities.applyStylesToHtml($element);
})