var main = angular.module("main");
main.controller("PhotoQuest", function($scope, ngDialog, $element, $http, $location, $upload){
    $scope.contentLoaded = false;

    var questId = Utilities.parseQuery($location.hash())["id"];
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

        PhotoquestUtils.initPagination($scope, $http, $location, {
            url: url,
            countUrl: countUrl,
            scopeArrayName: "photos",
            args: {
                id: questId
            }
        });
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
