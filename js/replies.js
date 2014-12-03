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
    }

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "replies"
    });

    Utilities.applyStylesToHtml($element);
});