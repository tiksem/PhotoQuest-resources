var main = angular.module("main");
main.controller("MessagesController", function($scope, $interval, $location, $timeout, $element, ngDialog, $http){
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

    $scope.keyPressed = function(event) {
        var key = event.which;
        if(key == 13 && !event.ctrlKey){
            var text = $scope.messageText;
            if(text != ""){
                $scope.sendMessage();
            }
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

    var messageArea = $("#message_textarea");

    var messagesContainer = $("#messages_container");
    $scope.sendMessage = function() {
        var text = messageArea.val();
        if(text == ""){
            return;
        }

        var user = $scope.user;

        messageArea.val("");

        if(text[text.length - 1] == '\n'){
            text = text.substr(0, text.length - 1);
        }

        var params = {
            toUserId: user.id,
            message: text
        };

        var url = "//sendMessage";
        $scope.showSendMessageLoading = true;
        Utilities.get($http, url, params,{
            success: function(data) {
                $scope.messages.push(data);
                $timeout(function() {
                    messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
                });
            },
            finished: function() {
                $scope.showSendMessageLoading = false;
            }
        });
    };

    $scope.getMessageText = function(message) {
        return message.message.replace(/\n/g, "<br />")
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});