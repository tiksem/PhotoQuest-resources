var main = angular.module("main");
main.controller("DialogsController", function($scope, $timeout, $location, $element, ngDialog, $http){
    PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
        url: "//getDialogs",
        countUrl: "//getDialogsCount",
        scopeArrayName: "dialogs"
    });

    Utilities.applyLinksBehavior($location, $scope, $element)();
});