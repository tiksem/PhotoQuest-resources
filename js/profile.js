var main = angular.module("main");
main.controller("ProfileController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    var checkPath = function() {
        return $location.search()["path"] === "profile";
    };

    var loadData = function() {
        var userId = $location.search()["id"];
        $scope.showProfileLoading = true;
        Http.loadUserToScope($scope, $http, userId, function(){
            $scope.user = $scope;
            $scope.showProfileLoading = false;
        });
    };
    loadData();

    $scope.setOnSignedInChangedListener(function() {
        loadData();
    });

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if(checkPath()){
            loadData();
        }
    });

    ControllerUtils.initProfileButtons($scope, $http);
    Utilities.applyLinksBehavior($location, $scope, $element)();
});
