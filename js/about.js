var main = angular.module("main");
main.controller("AboutController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    Utilities.applyLinksBehavior($location, $scope, $element)();
});

