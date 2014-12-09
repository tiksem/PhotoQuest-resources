var main = angular.module("main");
main.controller("PhotoQuests", function($scope, $location, $element, ngDialog, $http){
    $scope.openCreatePhotoquestDialog = function() {
        ngDialog.open({
            template: 'html/create_photo_quest_dialog.html',
            className: 'ngdialog-theme-default',
            controller: function($scope){
                $scope.createPhotoquest = function() {
                    var tags = $.map($scope.tags, function(tag){
                        return tag.text;
                    });
                    var config = {
                        params: {
                            name: $scope.createQuestName,
                            tags: tags.join(" ")
                        }
                    };
                    var url = window.location.origin + "/createPhotoquest";
                    $http.get(url, config).success(function(){
                        $scope.closeThisDialog(null);
                    });
                };
            }
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

    $scope.showCategoryTab = true;
    if(requestType == "quests" || !requestType){
        url = "//getPhotoquests";
        countUrl = "//getPhotoquestsCount";
        $scope.title = "Photoquests";
        $scope.showCategoryTab = false;
    } else if(requestType == "following_quests") {
        url = "//getFollowingPhotoquests";
        countUrl = "//getFollowingPhotoquestsCount";
        $scope.title = "Following photoquests";
    } else if(requestType == "created_quests") {
        url = "//getCreatedPhotoquests";
        countUrl = "//getCreatedPhotoquestsCount";
        $scope.title = "Created photoquests";
    } else {
        throw new Error("Invalid path");
    }

    $scope.showRatingTab = true;

    PhotoquestUtils.initPagination($scope, $http, $location, $element, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "quests"
    });

    Utilities.applyStylesToHtml($element);
});