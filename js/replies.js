var main = angular.module("main");
main.controller("RepliesController", function($scope, $location, $element, $http){
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
        }
    };

    $scope.getReplyLink = function(reply) {
        var type = reply.type;
        if(type === 0 || type === 1) {
            return "#?path=profile&id=" + reply.user.id;
        } else if(type === 2) { //COMMENT
            return "#?path=photo&id=" + reply.comment.photoId;
        }
    };

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "replies",
        reloadOnUserCounterChanged: "unreadRepliesCount"
    });

    Utilities.applyStylesToHtml($element);
});