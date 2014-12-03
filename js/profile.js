var main = angular.module("main");
main.controller("ProfileController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    var userId = $location.search()["id"];
    Http.loadUserToScope($scope, $http, userId);
    Utilities.applyStylesToHtml($element);
});
