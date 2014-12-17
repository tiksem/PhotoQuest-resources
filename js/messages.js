var main = angular.module("main");
main.controller("MessagesController", function($scope, $location, $element, ngDialog, $http){
    var userId = $scope.userId = $location.search()["id"];
    Http.loadUserToScope($scope.user = $scope.user || {}, $http, userId);

    $scope.getMessageAvatar = function(message) {
        var signedIn = $scope.getSignedInUser();
        var user = $scope.user;
        if(message.fromUserId === user.id){
            return user.avatar;
        } else {
            return signedIn.avatar;
        }
    };

    $scope.getMessageTitle = function(message) {
        var signedIn = $scope.getSignedInUser();
        var user = $scope.user;
        if(message.fromUserId !== user.id){
            user = signedIn;
        }

        return user.name + " " + user.lastName;
    };

    $scope.sendMessage = function() {
        var text = $scope.messageText;
        var user = $scope.user;

        var config = {
            params: {
                toUserId: user.id,
                message: text
            }
        }

        var url = window.location.origin + "//sendMessage"
        $http.get(url, config).success(function(data) {
            if(!data.error){
                $scope.messages.push(data);
            } else {
                console.error(data.error);
            }
        }).error(function(data){
            console.error(data);
        })
    };

    Utilities.applyLinksBehavior($scope, $element);
});