var main = angular.module("main");
main.controller("PhotoQuest", function($scope, ngDialog, $element, $http, $location, $upload, $timeout){
    $scope.contentLoaded = false;
    $scope.pageSize = 40;

    var tr = $scope.tr;

    var perform;
    $timeout(function() {
        perform = Utilities.perform;
        if(perform){
            Utilities.perform = false;
        }
    });

    var init = function() {
        var query = $location.search();
        var path = query["path"];

        var parentScope;
        if (path === "quest") {
            parentScope = $scope.quest = {};
        } else {
            parentScope = $scope.user = {};
        }

        var url = window.location.origin + (path === "quest" ? "//getPhotoquestById" : "//getUserById");

        var params = {
            id: $scope.getId(),
            limit: 50
        };

        Utilities.loadDataToScope(url, params, parentScope, $http, function () {
            $scope.contentLoaded = true;


            var url = function() {
                if (path === "quest") {
                    var category = $scope.getCategory();
                    if (category == "friends") {
                        return "//getFiendsPhotosOfPhotoquest";
                    } else if (category == "mine") {
                        return "//getUserPhotosOfPhotoquest";
                    } else {
                        return "//getPhotosOfPhotoquest"
                    }
                } else {
                    return "//getPhotosOfUser";
                }
            };

            var countUrl = function() {
                if (path === "quest") {
                    var category = $scope.getCategory();
                    if (category == "friends") {
                        return "//getFiendsPhotosOfPhotoquestCount";
                    } else if (category == "mine") {
                        return "//getUserPhotosOfPhotoquestCount";
                    } else {
                        return "//getPhotosOfPhotoquestCount";
                    }
                } else {
                    return "//getPhotosOfUserCount";
                }
            };

            var args = function() {
                if (path === "quest") {
                    return {
                        id: $scope.getId()
                    }
                } else {
                    return {
                        userId: $scope.getId()
                    }
                }
            };

            var initPagination = function () {
                PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
                    url: url,
                    success: function() {
                        if(perform){
                            $scope.openAddPhotoDialog();
                            perform = false;
                        }
                    },
                    countUrl: countUrl,
                    scopeArrayName: "photos",
                    args: args,
                    onPageChanged: function () {
                        if (path === "quest") {
                            $location.search("photoId", null);
                        }
                    }
                });
            };

            var photoId = query["photoId"];
            if (photoId && path === "quest") {
                Utilities.get($http, '//getPhotoPosition', {
                    id: photoId
                }, function (data) {
                    var page = Math.floor(data.result / $scope.pageSize) + 1;
                    $location.search("page", page);
                    initPagination();
                });
            } else {
                initPagination();
            }
        });
    };

    var scope = $scope;
    $scope.openAddPhotoDialog = function() {
        ngDialog.open({
            template: 'html/add_photo_dialog.html',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope) {
                $scope.quest = scope.quest;
                $scope.tr = scope.tr;

                scope.$on("destroy", function() {
                    $scope.closeThisDialog(null);
                });

                $scope.uploadPhoto = function() {
                    var uploadUrl = '/addPhotoToPhotoQuest?photoquest=' + $scope.getId();
                    var data = {
                        follow: $("#follow_checkbox").is(':checked')
                    };

                    if($scope.message){
                        data.message = $scope.message;
                    }

                    $scope.uploadPhotoLoading = true;
                    Utilities.uploadPhoto($scope, $upload, uploadUrl, data, function(data) {
                        $scope.uploadPhotoLoading = false;
                        $scope.closeThisDialog(null);
                        if($scope.quest.name === "Avatar"){
                            var signedInUser = scope.getSignedInUser();
                            signedInUser.avatar = data.url;
                            signedInUser.avatarId = data.id;
                        }
                        init();
                    }, function(data) {
                        $scope.uploadPhotoLoading = false;
                        var error = data.error;
                        if(error == "MissingServletRequestParameterException"){
                            $scope.errorMessage = tr.photoIsNotSelected;
                        } else if(error == "SmallImageException") {
                            var dimensions = data.data;
                            $scope.errorMessage = tr.smallImageException(dimensions.minWidth, dimensions.minHeight);
                        } else {
                            $scope.errorMessage = tr.unknownError;
                        }
                    });
                };
            }]
        });
    };

    $scope.getPhotoHref = function(photo) {
        var href = "#?path=photo&id=" + photo.id;
        var search = $location.search();
        var path = search["path"];
        var id = search["id"];

        if(path == "quest"){
            href += "&photoquestId=" + id;
            href += "&category=" + $scope.getCategory();
        } else if(path == "photos") {
            href += "&userId=" + id;
        }

        var order = $scope.getOrder();
        if (order) {
            href += "&order=" + order;
        }

        return href;
    };

    var prevCategory = $scope.getCategory();
    var checkPath = function() {
        var search = $location.search();
        var path = search.path;
        var category = $scope.getCategory();
        var result = (path == "quest" && search.photoquestId != undefined && category != prevCategory)
        || (path == "photos");
        prevCategory = category;
        return result;
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            init();
        }
    });

    init();

    Utilities.applyLinksBehavior($location, $scope, $element)();
});
