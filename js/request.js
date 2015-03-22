var main = angular.module("main");
main.controller("RequestController", function($scope, $http){
    $scope.params = [];
    $scope.add = function() {
        $scope.params.push($scope.addValue);
    };
    $scope.remove = function(param) {
        $scope.params.remove(param);
    }
});
