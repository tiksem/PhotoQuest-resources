var main = angular.module("main");
main.controller("DialogsController", function($scope, $location, $element, ngDialog, $http){
    $scope.openMessages = function(dialog) {
        $location.hash("path=messages&id=" + dialog.user.id);
    };

    Utilities.loadDataToScope(window.location.origin + "//getDialogs", {}, $scope, $http)

    Utilities.applyStylesToHtml($element);
});