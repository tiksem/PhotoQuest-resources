var main = angular.module("main");
var MAX_PHOTO_WIDTH = 850;
var MAX_PHOTO_HEIGHT = 450;

main.controller("PhotoController", function($scope, ngDialog, $element, $http, $location, $timeout){
    $scope.putComment = function(comment) {
        var message = $scope.message;
        $("#message_text_area").val("");
        $scope.message = "";
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
            params.photoId = $location.search()["id"];
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
            $scope.showNextPrevButtons = scope.showNextPrevButtons;

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
        var search = $location.search();
        var params = {
            id: search["id"]
        };

        if(search.userId){
            params.userId = search.userId;
        } else if(search.photoquestId) {
            params.photoquestId = search.photoquestId

            if(search.category){
                params.category = search.category;
            }
        }

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
        if(key == 13){
            var text = $scope.message;
            if(text != ""){
                $scope.putComment();
            }
            return;
        }

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
            params.photoquestId = search.photoquestId;
            var category = search.category;
            if (category == "all") {
                url = "//getNextPrevPhotoOfPhotoquest";
            } else if(category == "mine") {
                url = "//getNextPrevPhotoOfUserInPhotoquest";
            } else {
                url = "//getNextPrevPhotoOfFriendsInPhotoquest";
            }
        } else {
            return;
        }

        loadPhotoToScope(url, params, $http);
    };

    var checkPath = function() {
        var path = $location.search()["path"];
        return path == "photo";
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            $scope.reloadComments();
        }
    });

    $("#photo_image").bind("load", function() {
        var img = $(this);
        img[0].width = "100%";
        
        $timeout(function () {
            var width = img.width();
            var height = img.height();

            if (width <= MAX_PHOTO_WIDTH && height <= MAX_PHOTO_HEIGHT) {
                return;
            }

            var fix = function () {
                if (width > MAX_PHOTO_WIDTH) {
                    var k = MAX_PHOTO_WIDTH / width;
                    width = MAX_PHOTO_WIDTH;
                    height *= k;

                    if (height > MAX_PHOTO_HEIGHT) {
                        fix();
                    }
                } else {
                    var k = MAX_PHOTO_HEIGHT / height;
                    height = MAX_PHOTO_HEIGHT;
                    width *= k;
                }
            };

            fix();
            img.width(width).height(height);
        }, 100);
    });

    Utilities.applyLinksBehavior($location, $scope, $element);
});

