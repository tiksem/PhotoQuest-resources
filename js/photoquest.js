var main = angular.module("main");
main.controller("PhotoQuest", function($scope, ngDialog, $element, $http, $location, $upload){
    $scope.contentLoaded = false;
    $scope.pageSize = 10;

    var query = Utilities.parseQuery($location.hash());
    var questId = query["id"];

    var scope = $scope.quest = {};
    var url = window.location.origin + "//getPhotoquestById";
    var params = {
        id: questId,
        limit: 50
    };

    Utilities.loadDataToScope(url, params, scope, $http, function(){
        $scope.contentLoaded = true;

        var url = "//getPhotosOfPhotoquest";
        var countUrl = "//getPhotosOfPhotoquestCount"

        var initPagination = function() {
            PhotoquestUtils.initPagination($scope, $http, $location, {
                url: url,
                countUrl: countUrl,
                scopeArrayName: "photos",
                args: {
                    id: questId
                },
                onPageChanged: function() {
                    Utilities.setQueryParam($location, "photoId", undefined);
                }
            });
        };

        var photoId = query["photoId"];
        if(photoId){
            Utilities.get($http, '//getPhotoPosition', {
                id: photoId
            }, function(data) {
                var page = Math.floor(data.result / $scope.pageSize);
                Utilities.setQueryParam($location, "page", page);
                initPagination();
            });
        } else {
            initPagination();
        }
    });

    $scope.openAddPhotoDialog = function() {
        ngDialog.open({
            template: 'html/add_photo_dialog.html',
            className: 'ngdialog-theme-default',
            controller: 'PhotoQuest'
        });
    }

    $scope.onFileSelect = function($files) {
        var length = $files.length;
        for (var i = 0; i < length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/addPhotoToPhotoQuest?photoquest=' + questId,
                method: 'POST',
                file: file
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
        }
    };

    $scope.onPhotoClick = function(photo) {
        $location.hash("path=photo&id=" + photo.id);
    }

    Utilities.applyStylesToHtml($element);
});
