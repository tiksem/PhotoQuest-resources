var main = angular.module("main");
main.controller("PhotoController", function($scope, ngDialog, $element, $http, $location, $timeout){
    $scope.putComment = function(comment) {
        var message = $scope.message;
        if(message == ""){
            alert("Enter message");
            return;
        }

        var url = "//putComment";
        var params = {
            message: message
        };

        if(comment){
            params.commentId = comment.id;
        } else {
            params.$location.search()["id"] = $location.search()["id"];
        }

        $scope.commentsUpdatingStopped = true;
        Utilities.get($http, url, params, function(data) {
            var comments = $scope.comments = $scope.comments || [];
            comments.unshift(data);
            $scope.commentsUpdatingStopped = false;
            $timeout(function(){
                var commentsController = $("#comments_container")[0];
                commentsController.scrollTop = 0;
            });
        });
    };

    var loadPhotoToScope = function(url, params, $http) {
        var scope = $scope.photo = {};
        Utilities.loadDataToScope(window.location.origin + url, params, scope, $http, function(){
            $scope.likePhoto = function() {
                var params = {
                    photoId: $location.search()["id"]
                };

                Http.toggleLikeState($http, $scope.photo, params);
            };

            $scope.likeComment = function(comment) {
                var params = {
                    commentId: comment.id
                };

                Http.toggleLikeState($http, comment, params);
            }

            $location.search("id", scope.id);
        });
    };

    var loadData = function() {
        var url = "//getPhotoById";
        var params = {
            id: $location.search()["id"]
        };

        loadPhotoToScope(url, params, $http);
    };
    loadData();

    $scope.setOnSignedInChangedListener(loadData);

    $scope.isMineComment = function(comment) {
        var signedUser = $scope.getSignedInUser();
        if(!signedUser){
            return false;
        }

        return comment.userId === signedUser.id;
    };

    $scope.deleteComment = function(comment) {
        var url = "//deleteComment";
        var params = {
            id: comment.id
        };
        Utilities.get($http, url, params, function (data) {
            $scope.comments.remove(comment);
        });
    };

    $scope.getDisplayDate = function(addingDate) {
        return Utilities.getDisplayDate(addingDate);
    };

    $scope.keyPressed = function(event) {
        if(!$scope.photo.id){
            return;
        }

        var key = event.which;
        var next = key == 39;
        if(!next && key != 37){
            return;
        }

        var search = $location.search();
        var params = {
            photoId: search["id"],
            next: next
        };
        var url;
        if(search.userId){
            params.userId = search.userId;
            url = "//getNextPrevPhotoOfUser";
        } else if(search.photoquestId) {
            params.photoquestId = search.photoquestId
            url = "//getNextPrevPhotoOfPhotoquest";
        } else {
            return;
        }

        loadPhotoToScope(url, params, $http);
    };

    $scope.showNextPrevButtons = function() {
        var search = $location.search();
        return search.userId || search.photoquestId;
    };

    Utilities.applyLinksBehavior($location, $scope, $element);
});

