var main = angular.module("main");
main.controller("HeaderController", function($scope, $location, $element, ngDialog, $http){
    $scope.signout = function() {
        Http.signout($scope, $http);
    };

    $scope.$on('$locationChangeSuccess', function (event, current, prev) {
        var lastPath = Utilities.getParameterByName("path", prev);
        var currentPath = Utilities.getParameterByName("path", current);

        if(lastPath != "photo" && currentPath == "photo"){
            $scope.backButtonUrl = prev;
        } else if(lastPath != "photo" || currentPath != "photo") {
            delete $scope.backButtonUrl;
        }
    });

    $scope.onBack = function() {
        document.location.href = $scope.backButtonUrl;
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});