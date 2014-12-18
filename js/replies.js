var main = angular.module("main");
main.controller("RepliesController", function($scope, $location, $element, $http, $timeout){
    var url = "//getReplies";
    var countUrl = "//getRepliesCount";

    $scope.getReplyMessage = function(reply) {
        var type = reply.type;
        if(type === 0){ //FRIEND_REQUEST_ACCEPTED
            return "accepted your friend request";
        } else if(type === 1) { //FRIEND_REQUEST_DECLINED
            return "declined your friend request";
        } else if(type === 2) { //COMMENT
            return "commented your photo";
        } else if(type === 3) { //LIKE
            if (reply.like.photoId) {
                return "liked your photo";
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

    Utilities.applyLinksBehavior($location, $scope, $element);
});