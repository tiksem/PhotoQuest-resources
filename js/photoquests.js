var main = angular.module("main");
main.controller("PhotoQuests", function($scope, $location, $element, ngDialog, $http, $timeout){
    $scope.openCreatePhotoquestDialog = function() {
        ngDialog.open({
            template: 'html/create_photo_quest_dialog.html',
            className: 'ngdialog-theme-default',
            controller: function($scope){
                $scope.createPhotoquest = function() {
                    var tags = $.map($scope.tags, function(tag){
                        return tag.text;
                    });
                    var params = {
                        name: $scope.createQuestName,
                        tags: tags.join(" "),
                        follow: $("#follow_checkbox").is(':checked')
                    };
                    var url = "//createPhotoquest";
                    Utilities.get($http, url, params, function(){
                        $scope.closeThisDialog(null);
                        init();
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

    var requestType;
    var init = function () {
        var url;
        var countUrl;
        var search = $location.search();
        requestType = search["path"];
        var args;

        $scope.showCategoryTab = true;
        if (requestType == "quests" || !requestType) {
            url = "//getPhotoquests";
            countUrl = "//getPhotoquestsCount";
            $scope.title = "Photoquests";
            $scope.showCategoryTab = false;
        } else if (requestType == "following_quests") {
            url = "//getFollowingPhotoquests";
            countUrl = "//getFollowingPhotoquestsCount";
            $scope.title = "Following photoquests";
        } else if (requestType == "created_quests") {
            url = "//getCreatedPhotoquests";
            countUrl = "//getCreatedPhotoquestsCount";
            $scope.title = "Created photoquests";
        } else if (requestType == "performed_quests") {
            url = "//getPerformedPhotoquests";
            countUrl = "//getPerformedPhotoquestsCount";
            $scope.title = "Performed photoquests";
        } else {
            throw new Error("Invalid path");
        }

        $scope.showRatingTab = true;
        if ($scope.showCategoryTab) {
            args = {
                userId: search["id"]
            }
        }

        PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
            url: url,
            countUrl: countUrl,
            scopeArrayName: "quests",
            args: args
        });
    };
    init();

    var checkPath = function() {
        var path = $location.search()["path"];
        return (path == "quests" || path == "following_quests" || path == "created_quests" ||
            path == "performed_quests") && path != requestType;
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            init();
        }
    });

    Utilities.applyLinksBehavior($location, $scope, $element);
});