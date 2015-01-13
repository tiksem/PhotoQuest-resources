var main = angular.module("main");
main.controller("PhotoQuest", function($scope, ngDialog, $element, $http, $location, $upload, $timeout){
    $scope.contentLoaded = false;
    $scope.pageSize = 40;

    var query = $location.search();
    var path = query["path"];
    var id = query["id"];

    var scope;
    if (path === "quest") {
        scope = $scope.quest = {};
    } else {
        scope = $scope.user = {};
    }

    var url = window.location.origin + (path === "quest" ? "//getPhotoquestById" : "//getUserById");
    var params = {
        id: id,
        limit: 50
    };

    Utilities.loadDataToScope(url, params, scope, $http, function(){
        $scope.contentLoaded = true;


        var url;
        var countUrl;
        var args;
        if(path === "quest"){
            url = "//getPhotosOfPhotoquest";
            countUrl = "//getPhotosOfPhotoquestCount";
            args = {
                id: id
            }
        } else {
            url = "//getPhotosOfUser";
            countUrl = "//getPhotosOfUserCount";
            args = {
                userId: id
            }
        }

        var initPagination = function() {
            PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
                url: url,
                countUrl: countUrl,
                scopeArrayName: "photos",
                args: args,
                onPageChanged: function() {
                    if (path === "quest") {
                        $location.search("photoId", null);
                    }
                }
            });
        };

        var photoId = query["photoId"];
        if(photoId && path === "quest"){
            Utilities.get($http, '//getPhotoPosition', {
                id: photoId
            }, function(data) {
                var page = Math.floor(data.result / $scope.pageSize) + 1;
                $location.search("page", page);
                initPagination();
            });
        } else {
            initPagination();
        }
    });

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
                    $scope.upload = $upload.upload({
                        url: '/addPhotoToPhotoQuest?photoquest=' + id,
                        method: 'POST',
                        data: {
                            message: $scope.message,
                            follow: $("#follow_checkbox").is(':checked')
                        },
                        file: $scope.file
                    }).progress(function (evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        if (!data.error) {
                            alert("Success");
                        } else {
                            console.error(data);
                        }
                    }).error(function(data){
                        console.error(data);
                    })
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
        } else if(path == "photos") {
            href += "&userId=" + id;
        }

        return href;
    };

    Utilities.applyLinksBehavior($location, $scope, $element);
});
