var main = angular.module("main");
main.controller("PhotoQuests", function($scope, $location, $element, ngDialog, $http){
    $scope.openCreatePhotoquestDialog = function() {
        ngDialog.open({
            template: 'html/create_photo_quest_dialog.html',
            className: 'ngdialog-theme-default',
            controller: 'PhotoQuests'
        });
    };

    $scope.createPhotoquest = function() {
        var config = {
            params: {
                name: $scope.createQuestName
            }
        };
        var url = window.location.origin + "/createPhotoquest";
        $http.get(url, config).success(function(){
            $scope.closeThisDialog(null);
        });
    };

    $scope.toggleFollowState = function(quest) {
        var isFollowing = quest.isFollowing;
        var url = isFollowing ? "//unfollowQuest" : "//followQuest";
        Utilities.get($http, url, {
            questId: quest.id
        }, function(){
            quest.isFollowing = !quest.isFollowing;
        });
    };

    var url;
    var countUrl;
    var requestType = $location.search()["path"];

    if(requestType == "quests" || !requestType){
        url = "//getPhotoquests";
        countUrl = "//getPhotoquestsCount";
        $scope.showRatingTab = true;
        $scope.title = "Photoquests";
    } else if(requestType == "following_quests") {
        url = "//getFollowingPhotoquests";
        countUrl = "//getFollowingPhotoquestsCount";
        $scope.title = "Following photoquests";
    } else {
        throw new Error("Invalid path");
    }

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "quests"
    });

    Utilities.applyStylesToHtml($element);
});