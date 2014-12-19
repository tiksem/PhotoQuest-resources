var main = angular.module("main");
main.controller("PhotoController", function($scope, ngDialog, $element, $http, $location, $timeout){
    var photoId = $location.search()["id"];
    $scope.image = window.location.origin + "//image/" + photoId;

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
            params.photoId = photoId;
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

    var loadData = function() {
        var scope = $scope.photo = {};
        var url = window.location.origin + "//getPhotoById";
        var params = {
            id: photoId
        };

        Utilities.loadDataToScope(url, params, scope, $http, function(){
            $scope.photoId = photoId;

            $scope.likePhoto = function() {
                var params = {
                    photoId: photoId
                };

                Http.toggleLikeState($http, $scope.photo, params);
            };

            $scope.likeComment = function(comment) {
                var params = {
                    commentId: comment.id
                };

                Http.toggleLikeState($http, comment, params);
            }
        });
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

    Utilities.applyLinksBehavior($location, $scope, $element);
})

