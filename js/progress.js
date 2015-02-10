var main = angular.module("main");
main.controller("ProgressController", function(
    $location, $rootScope, $scope, $timeout, $element, $http, $cookies){
    Http.runRequestPeriodically($scope, $http, $timeout, "//progress", {
        success: function(data) {
            Utilities.addProperties($scope, data);
        }
    })
});
