var main = angular.module("main");
main.controller("DialogsController", function($scope, $location, $element, ngDialog, $http){
    Utilities.loadDataToScope(window.location.origin + "//getDialogs", {}, $scope, $http)
    Utilities.applyLinksBehavior($location, $scope, $element)();
});