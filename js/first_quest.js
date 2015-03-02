var main = angular.module("main");
main.controller("FirstQuest", function($location, $cookies, $timeout, $scope, $element, $http, $upload){
    $scope.perform = function() {
        var url = "//changeAvatar";
        $scope.laoding = true;
        Utilities.uploadPhoto($scope, $upload, url, {}, function() {
            Http.trySignInFromCookies($cookies, $timeout, $scope, $http, function() {
                $scope.laoding = false;
                document.location.href = "#?path=quests";
            })
        });
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});

