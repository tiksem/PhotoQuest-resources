var main = angular.module("main");
main.controller("PeopleController", function($scope, $location, $element, ngDialog, $http){
    $scope.openProfile = function(user) {
        $location.search("path", "profile");
        $location.search("id", user.id);
    };

    $scope.addOrRemoveFriend = function(user) {
        var config = {
            params: {
                id: user.id
            }
        };

        var removeFriend = user.relation == "friend" || user.relation == "request_sent";
        var url = window.location.origin +
            (removeFriend ? "//removeFriend" : "//addFriend");

        $http.get(url, config).success(function(data){
            if(!data.error){
                if(removeFriend){
                    delete user.relation;
                } else {
                    if(user.relation == "request_received"){
                        user.relation = "friend";
                    } else {
                        user.relation = "request_sent";
                    }
                }
            } else {
                console.error(data);
            }
        });
    };

    $scope.getToggleFriendStatusButtonName = function(user) {
        var relation = user.relation;
        if(relation == "friend"){
            return "Remove friend";
        } else if(relation == "request_sent") {
            return "Cancel friend request"
        } else if(relation == "request_received") {
            return "Accept friend request"
        } else {
            return "Add friend";
        }
    };

    $scope.writeMessage = function(user) {
        $location.search("path", "messages");
        $location.search("id" + user.id);
    };

    var url;
    var countUrl;
    var requestType = $location.search()["path"];
    if(requestType == "friends"){
        url = "//friends";
        countUrl = "//getFriendsCount";
    } else {
        url = "//users";
        countUrl = "//getUsersCount";
    }

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "users"
    });

    Utilities.applyStylesToHtml($element);
});