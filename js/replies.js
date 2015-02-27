var main = angular.module("main");
main.controller("RepliesController", function($scope, $location, $element, $http, $timeout){
    var url = "//getReplies";
    var countUrl = "//getRepliesCount";
    var tr =$scope.tr;

    $scope.getReplyMessage = function(reply) {
        var type = reply.type;
        if(type === 0){ //FRIEND_REQUEST_ACCEPTED
            return "accepted your friend request";
        } else if(type === 1) { //FRIEND_REQUEST_DECLINED
            return "declined your friend request";
        } else if(type === 2) { //COMMENT
            var comment = reply.comment;
            if(comment.photoId){
                return "commented your photo";
            } else if(comment.toCommentId) {
                return "answered your comment";
            } else {
                return "error?";
            }
        } else if(type === 3) { //LIKE
            var like = reply.like;
            if (like.commentId) {
                return "liked your comment";
            } else if(like.photoId) {
                return "liked your photo";
            } else {
                return "error?";
            }
        }
    };

    $scope.getReplyLink = function(reply) {
        var type = reply.type;
        if(type === 0 || type === 1) {
            return "#?path=profile&id=" + reply.user.id;
        } else if(type === 2) { //COMMENT
            return "#?path=photo&id=" + reply.comment.photoId;
        } else if(type === 3) { //LIKE
            return "#?path=photo&id=" + reply.like.photoId;
        }
    };

    PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "replies",
        reloadOnUserCounterChanged: "unreadRepliesCount"
    });

    Utilities.applyLinksBehavior($location, $scope, $element)();
});