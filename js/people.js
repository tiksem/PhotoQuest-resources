var main = angular.module("main");
main.controller("PeopleController", function($scope, $location, $element, ngDialog, $http){
    $scope.addOrRemoveFriend = function(user, decline) {
        var config = {
            params: {
                id: user.id
            }
        };

        var removeFriend = user.relation == "friend" || user.relation == "request_sent" || decline;
        var url = window.location.origin +
            (removeFriend ? "//removeFriend" : "//addFriend");

        $http.get(url, config).success(function(data){
            if(!data.error){
                if(removeFriend){
                    if (!decline) {
                        delete user.relation;
                    } else {
                        user.relation = "follows";
                    }
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
        } else if(relation == "follows") {
            return "Unfollow"
        } else if(relation == "followed") {
            return "Accept friend request"
        } else {
            return "Add friend";
        }
    };

    var url;
    var countUrl;
    var countProvider;
    var requestType = $location.search()["path"];
    if(requestType == "friends"){
        url = "//friends";
        countUrl = "//getFriendsCount";
    } else if(requestType == "people") {
        url = "//users";
        countUrl = "//getUsersCount";
    } else if(requestType == "received_requests") {
        url = "//getReceivedFriendRequests";
        countProvider = function() {
            var user = $scope.getSignedInUser();
            if(user){
                return user.receivedRequestsCount;
            }

            return 0;
        }
    } else if(requestType == "sent_requests") {
        url = "//getSentFriendRequests";
        countProvider = function() {
            var user = $scope.getSignedInUser();
            if(user){
                return user.sentRequestsCount;
            }

            return 0;
        }
    }

    $scope.showFriendTabs = requestType !== "people";

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        scopeArrayName: "users",
        countProvider: countProvider
    });

    Utilities.applyStylesToHtml($element);
});