var main = angular.module("main", ['ngDialog', 'angularFileUpload', 'ngCookies',
    'angularUtils.directives.dirPagination', 'infinite-scroll', 'ngTagsInput', 'tiksem-keyboard']);
main.controller("Main", function($http, $element, $timeout, $scope, $location, $cookies){
    ControllerUtils.initController($scope, $location);

    var onSignedInChanged = [];

    var signedInUser = null;
    $scope.getSignedInUser = function() {
        return signedInUser;
    };
    $scope.setSignedInUser = function(user) {
        if(user === signedInUser){
            return;
        }

        var prev = signedInUser;
        signedInUser = user;
        onSignedInChanged.forEach(function(i){
            i(prev, user);
        });
    };
    $scope.setOnSignedInChangedListener = function(listener){
        onSignedInChanged.push(listener);
        this.$on("$destroy", function() {
            onSignedInChanged.remove(listener);
        });
    };

    var getCenterPageContent = function(){
        var defaultContent = 'html/photoquests.html'

        var search = $location.search();
        if(!search){
            return defaultContent;
        }

        var path = search["path"];
        var id = search["id"];

        if(path == "quest"){
            if(id && id.isNumber()){
                return 'html/quest.html';
            }
        } else if(path == "people") {
            return 'html/people.html';
        } else if(path == "photo"){
            if(id && id.isNumber()){
                return 'html/photo.html';
            }
        } else if(path == "profile") {
            if(id && id.isNumber()){
                return 'html/profile.html';
            }
        }  else if(path == "photos"){
            if(id && id.isNumber()){
                return 'html/photos.html';
            }
        } else if(path == "register") {
            return 'html/register_dialog.html';
        } else if(signedInUser) {
            if(path == "dialogs") {
                return 'html/dialogs.html';
            } else if(path == "messages") {
                if(id && id.isNumber()){
                    return 'html/messages.html';
                }
            } else if(path == "friends") {
                return 'html/friends.html';
            } else if(path == "replies") {
                return 'html/replies.html';
            } else if(path == "sent_requests") {
                return 'html/friends.html';
            } else if(path == "received_requests") {
                return 'html/friends.html';
            } else if(path == "following_quests") {
                return 'html/photoquests.html';
            } else if(path == "created_quests") {
                return 'html/photoquests.html';
            } else if(path == "news") {
                return 'html/news.html';
            } else if(path == "settings") {
                return 'html/settings.html';
            }
        }

        $location.search("path", "quests");

        return defaultContent;
    };

    Http.trySignInFromCookies($cookies, $timeout, $scope, $http, function(){
        $scope.getCenterPageContent = getCenterPageContent;
    });

    Utilities.applyLinksBehavior($location, $scope, $element);
});
