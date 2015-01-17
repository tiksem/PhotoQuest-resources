var main = angular.module("main");
main.controller("PhotoQuest", function($scope, ngDialog, $element, $http, $location, $upload, $timeout){
    $scope.contentLoaded = false;
    $scope.pageSize = 40;

    var query = $location.search();
    var path = query["path"];
    var id = query["id"];

    var parentScope;
    if (path === "quest") {
        parentScope = $scope.quest = {};
    } else {
        parentScope = $scope.user = {};
    }

    var url = window.location.origin + (path === "quest" ? "//getPhotoquestById" : "//getUserById");

    var params = {
        id: id,
        limit: 50
    };

    var init = function() {
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
                        id: id
                    }
                } else {
                    return {
                        userId: id
                    }
                }
            };

            var initPagination = function () {
                PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
                    url: url,
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
            controller: function($scope) {
                $scope.quest = scope.quest;
                $scope.onFileSelect = function($files) {
                    $scope.file = $files[0];
                };

                $scope.uploadPhoto = function() {
                    var uploadUrl = '/addPhotoToPhotoQuest?photoquest=' + id;
                    var data = {
                        follow: $("#follow_checkbox").is(':checked')
                    };

                    if($scope.message){
                        data.message = $scope.message;
                    }

                    Utilities.uploadPhoto($scope, $upload, uploadUrl, data, function() {
                        $scope.closeThisDialog(null);
                        init();
                    });
                };
            }
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

        return href;
    };

    var prevCategory = $scope.getCategory();
    var checkPath = function() {
        var search = $location.search();
        var path = search.path;
        var category = $scope.getCategory();
        var result = path == "quest" && search.photoquestId != undefined && category != prevCategory;
        prevCategory = category;
        return result;
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            init();
        }
    });

    init();

    Utilities.applyLinksBehavior($location, $scope, $element);
});
