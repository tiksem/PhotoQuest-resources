var main = angular.module("main");
main.controller("PhotoQuests", function($scope, $location, $element, ngDialog, $http, $timeout){
    $scope.filter = $location.search()["filter"];

    $scope.onPerform = function() {
        Utilities.perform = true;
    };

    var scope = $scope;
    $scope.openCreatePhotoquestDialog = function() {
        ngDialog.open({
            template: 'html/create_photo_quest_dialog.html',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope){
                var tr = $scope.tr = scope.tr;

                $scope.createPhotoquest = function() {
                    var tags = $scope.tags;
                    var maxTags = $scope.maxTags;
                    if(tags.length > maxTags) {
                        $scope.errorMessage = tr.tooManyTags(maxTags);
                        return;
                    }

                    var photoQuestName = $scope.createQuestName;
                    if (!photoQuestName || $.trim(photoQuestName) == "") {
                        $scope.errorMessage = tr.emptyPhotoquestNameError;
                        return;
                    }

                    tags = $.map(tags, function(tag){
                        return tag.text;
                    });

                    var params = {
                        name: photoQuestName,
                        tags: tags.join(" "),
                        follow: $("#follow_checkbox").is(':checked')
                    };
                    var url = "//createPhotoquest";
                    $scope.showLoading = true;
                    Utilities.get($http, url, params, {
                        success: function() {
                            $scope.closeThisDialog(null);
                            init();
                        },
                        finished: function(){
                            $scope.showLoading = false;
                        },
                        error: function(data) {
                            if(data.error == "PhotoquestExistsException") {
                                $scope.errorMessage = tr.photoquestExists(photoQuestName)
                            } else {
                                $scope.errorMessage = tr.unknownError;
                            }
                        }
                    });
                };
            }]
        });
    };

    var id = $location.search()["id"];
    var signedInUser = $scope.getSignedInUser();
    if(id && (!signedInUser || id != signedInUser.id)){
        Http.loadUserToScope($scope.user = {}, $http, id);
    }

    $scope.toggleFollowState = function(quest) {
        var isFollowing = quest.isFollowing;
        var url = isFollowing ? "//unfollowQuest" : "//followQuest";
        quest.followLoading = true;
        Utilities.get($http, url, {
            questId: quest.id
        }, {
            success: function(){
                quest.isFollowing = !quest.isFollowing;
            },
            finished: function() {
                quest.followLoading = false;
            }
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
            $scope.title = $scope.tr.photoquests;
            $scope.showCategoryTab = false;
        } else if (requestType == "following_quests") {
            url = "//getFollowingPhotoquests";
            countUrl = "//getFollowingPhotoquestsCount";
            $scope.title = $scope.tr.followingPQ;
        } else if (requestType == "created_quests") {
            url = "//getCreatedPhotoquests";
            countUrl = "//getCreatedPhotoquestsCount";
            $scope.title = $scope.tr.createdPQ;
        } else if (requestType == "performed_quests") {
            url = "//getPerformedPhotoquests";
            countUrl = "//getPerformedPhotoquestsCount";
            $scope.title = $scope.tr.performedPQ;
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

    Utilities.applyLinksBehavior($location, $scope, $element)();
});