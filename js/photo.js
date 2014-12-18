var main = angular.module("main");
main.controller("PhotoController", function($scope, ngDialog, $element, $http, $location, $timeout){
    var photoId = $location.search()["id"];
    $scope.image = window.location.origin + "//image/" + photoId;

    $scope.putComment = function() {
        var message = $scope.message;
        if(message == ""){
            alert("Enter message");
            return;
        }

        var url = "//putComment";
        var params = {
            photoId: photoId,
            message: message
        };

        Utilities.get($http, url, params, function(data) {
            var comments = $scope.comments = $scope.comments || [];
            comments.push(data);
            $timeout(function(){
                var commentsController = $("#comments_container")[0];
                commentsController.scrollTop = commentsController.scrollHeight;
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

            var unlike = function(item) {
                var url = "//unlike";
                var params = {
                    id: item.yourLike.id
                };
                Utilities.get($http, url, params, function(data) {
                    item.yourLike = null;
                    item.likesCount--;
                });
            };

            var like = function(item, params) {
                var url = "//like";
                Utilities.get($http, url, params, function(data) {
                    item.yourLike = data;
                    item.likesCount++;
                });
            };

            var toggleLikeState = function(item, params) {
                if (item.yourLike) {
                    unlike(item);
                } else {
                    like(item, params);
                }
            };

            $scope.likePhoto = function() {
                var params = {
                    photoId: photoId
                };

                toggleLikeState($scope.photo, params);
            };

            $scope.likeComment = function(comment) {
                var params = {
                    commentId: comment.id
                };

                toggleLikeState(comment, params);
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

