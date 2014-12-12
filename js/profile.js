var main = angular.module("main");
main.controller("ProfileController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    var userId = $location.search()["id"];
    Http.loadUserToScope($scope, $http, userId, function(){
        $scope.user = $scope;
    });
    ControllerUtils.initProfileButtons($scope, $http);
    Utilities.applyStylesToHtml($element);
});
