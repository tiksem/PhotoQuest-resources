var main = angular.module("main");
main.controller("FirstQuest", function($location, $cookies, $timeout, $scope, $element, $http, $upload){
    $scope.perform = function() {
        var url = "//changeAvatar";
        Utilities.uploadPhoto($scope, $upload, url, {}, function() {
            Http.trySignInFromCookies($cookies, $timeout, $scope, $http, function() {
                document.location.href = "#?path=quests";
            })
        });
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});

