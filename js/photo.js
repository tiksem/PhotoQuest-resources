var main = angular.module("main");
main.controller("PhotoController", function($scope, ngDialog, $element, $http, $location, $timeout){
    var photoId = $location.search()["id"];
    $scope.image = window.location.origin + "/image/" + photoId;

    $scope.putComment = function() {
        var message = $scope.message;
        if(message == ""){
            alert("Enter message");
            return;
        }

        var url = window.location.origin + "/putComment";
        var config = {
            params: {
                photoId: photoId,
                message: message
            }
        };
        $http.get(url, config).success(function(data){
            if(!data.error){
                var comments = $scope.comments = $scope.comments || [];
                comments.push(data);
                $timeout(function(){
                    var commentsController = $("#comments_container")[0];
                    commentsController.scrollTop = commentsController.scrollHeight;
                });
            } else {
                console.error(data);
            }
        });
    };

    var scope = $scope.photo = {};
    var url = window.location.origin + "//getPhotoById";
    var params = {
        id: photoId
    };

    Utilities.loadDataToScope(url, params, scope, $http, function(){
        $scope.photoId = photoId;

        var unlike = function(item) {
            var url = window.location.origin + "//unlike";
            var config = {
                params: {
                    id: item.yourLike.id
                }
            };
            $http.get(url, config).success(function (data) {
                if (!data.error) {
                    item.yourLike = null;
                    item.likesCount--;
                    console.log(data);
                } else {
                    console.error(data);
                }
            })
        }

        var like = function(item, params) {
            var url = window.location.origin + "//like";
            var config = {
                params: params
            };
            $http.get(url, config).success(function (data) {
                if (!data.error) {
                    item.yourLike = data;
                    item.likesCount++;
                    console.log(data);
                } else {
                    console.error(data);
                }
            })
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

    $scope.isMineComment = function(comment) {
        var signedUser = $scope.getSignedInUser();
        if(!signedUser){
            return false;
        }

        return comment.userId === signedUser.id;
    };

    $scope.deleteComment = function(comment) {
        var url = window.location.origin + "//deleteComment";
        var config = {
            params: {
                id: comment.id
            }
        };
        $http.get(url, config).success(function (data) {
            if (!data.error) {
                $scope.comments.remove(comment);
                console.log(data);
            } else {
                console.error(data);
            }
        })
    };

    Utilities.applyStylesToHtml($element);
})

