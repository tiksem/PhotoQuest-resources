var main = angular.module("main");
main.controller("ProfileController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    var userId = Utilities.parseQuery($location.hash())["id"];
    Utilities.loadDataToScope(window.location.origin + "//getUserById", {
        id: userId
    }, $scope, $http);

    Utilities.applyStylesToHtml($element);
})
