var main = angular.module("main");
var MAX_PHOTO_WIDTH = 850;
var MAX_PHOTO_HEIGHT = 500;

main.controller("PhotoController", function($scope, $interval, ngDialog, $element, $http, $location, $timeout){
    $scope.reply = function(comment) {
        comment.showReplyForm = true;
    };

    $scope.putComment = function(comment) {
        if(comment){
            if (comment.replyCommentLoading) {
                return;
            }
        } else if($scope.putCommentLoading) {
            return;
        }

        var message = comment ? comment.replyMessage : $scope.message;

        $("#message_text_area").val("");
        if (!comment) {
            $scope.message = "";
        } else {
            comment.replyMessage = "";
        }

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
            comment.replyCommentLoading = true;
        } else {
            params.photoId = $location.search()["id"];
            $scope.putCommentLoading = true;
        }

        $scope.commentsUpdatingStopped = true;
        Utilities.get($http, url, params, {
            success: function(data) {
                var comments = $scope.comments = $scope.comments || [];
                comments.unshift(data);
                $scope.commentsUpdatingStopped = false;
                $timeout(function(){
                    var commentsController = $("#comments_container")[0];
                    commentsController.scrollTop = 0;
                });
            },
            finished: function() {
                $scope.putCommentLoading = false;
                if (comment) {
                    comment.replyCommentLoading = false;
                    comment.showReplyForm = false;
                }
            }
        });
    };

    var loadPhotoToScope = function(url, params, $http, reloadComments) {
        var scope = $scope.photo = $scope.photo || {};
        Utilities.loadDataToScope(window.location.origin + url, params, scope, $http, {
            success: function(){
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
                };

                $location.search("id", scope.id);
                if(reloadComments){
                    $scope.reloadComments(true);
                }
            },
            error: function() {
                scope.deleted = true;
            }
        });
    };

    var disableLoadData = false;
    var loadData = function(reloadComments) {
        var url = "//getPhotoById";
        var search = $location.search();
        var params = {
            id: search["id"]
        };

        if(search.userId){
            params.userId = search.userId;
        } else if(search.photoquestId) {
            params.photoquestId = search.photoquestId
        }

        if(search.category){
            params.category = search.category;
        }

        loadPhotoToScope(url, params, $http, reloadComments);
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
        comment.deleteLoading = true;
        Utilities.get($http, url, params, {
            success: function (data) {
                $scope.comments.remove(comment);
                $scope.reloadComments();
            },
            finished: function() {
                comment.deleteLoading = false;
            }
        });
    };

    $scope.getDisplayDate = function(addingDate) {
        return Utilities.getDisplayDate(addingDate, $scope.tr.monthOfYear, $scope.tr.at);
    };

    var createParams = function(next) {
        var search = $location.search();
        return {
            photoId: search["id"],
            next: next,
            order: search["order"],
            userId: search["userId"],
            photoquestId: search["photoquestId"],
            category: search["category"]
        };
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

        var params = createParams(next);
        var url = "//getNextPrevPhoto";

        $scope.showPhotoLoading = true;
        loadPhotoToScope(url, params, $http);
    };

    $scope.setAsAvatar = function() {
        var url = "//setAvatar";
        var params = {
            photoId : $location.search()["id"]
        };

        Utilities.get($http, url, params, function(data) {
            var signedInUser = $scope.getSignedInUser();
            signedInUser.avatar = data.url;
            signedInUser.avatarId = data.id;
        });
    };

    var checkPath = function() {
        var path = $location.search()["path"];
        return path == "photo";
    };

    $scope.openPhoto = function() {
        window.open($scope.photo.url);
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            if ($scope.photo.id != $scope.getId()) {
                loadData(true);
            } else {
                $scope.reloadComments(true);
            }
        }
    });

    $("#photo_image").bind("load", function() {
        $scope.$apply(function () {
            $scope.showPhotoLoading = false;
        });

        var img = $(this);
        img.css({
            width: "auto",
            height: "auto"
        });

        var width = img[0].width;
        var height = img[0].height;

        console.log("width = " + width + " height = " + height);

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
        //img.width(width).height(height);
        img.css({
            width: width,
            height: height
        });
    });

    var scope = $scope;
    $scope.openDeletePhotoDialog = function() {
        ngDialog.open({
            template: 'html/delete_photo_dialog.html',
            className: 'ngdialog-theme-default',
            controller: function($scope){
                $scope.tr = scope.tr;

                $scope.deletePhoto = function() {
                    $scope.showLoading = true;
                    var photoId = scope.photo.id;
                    var isAvatar = photoId == scope.getSignedInUser().avatarId;
                    var url = "//deletePhoto";
                    var params = createParams(true);
                    Utilities.get($http, url, params, {
                        success: function(data) {
                            if(isAvatar){
                                var signedInUser = scope.getSignedInUser();
                                delete signedInUser.avatarId;
                                signedInUser.avatar = window.location.origin + "/images/empty_avatar.jpg"
                            }
                            if (!data.id || photoId === data.id) {
                                scope.photo.deleted = true;
                            } else {
                                scope.photo = data;
                                $location.search("id", scope.photo.id);
                            }
                            $scope.closeThisDialog(null);
                        },
                        finished: function(){
                            $scope.showLoading = false;
                        },
                        error: function(data) {
                            var message = "Unknown error";
                            if(data && data.message){
                                message = data.message;
                            }

                            $scope.errorMessage = message;
                            alert(message);
                        }
                    });
                };

                $scope.cancel = function() {
                    $scope.closeThisDialog(null);
                }
            }
        });
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});

