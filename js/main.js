var main = angular.module("main", ['ngDialog', 'angularFileUpload', 'ngCookies',
    'angularUtils.directives.dirPagination', 'infinite-scroll', 'ngTagsInput']);
main.controller("Main", function($http, $element, $timeout, $scope, $location, $cookies){
    var signedInUser = null;
    $scope.getSignedInUser = function() {
        return signedInUser;
    };
    $scope.setSignedInUser = function(user) {
        signedInUser = user;
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
                return 'html/photoquest.html';
            }
        } else if(path == "people") {
            return 'html/people.html';
        } else if(path == "friends") {
            return 'html/friends.html';
        } else if(path == "photo"){
            if(id && id.isNumber()){
                return 'html/photo.html';
            }
        } else if(path == "profile") {
            if(id && id.isNumber()){
                return 'html/profile.html';
            }
        } else if(path == "dialogs") {
            return 'html/dialogs.html';
        } else if(path == "messages") {
            if(id && id.isNumber()){
                return 'html/messages.html';
            }
        } else if(path == "register") {
            return 'html/register_dialog.html';
        } else if(path == "replies") {
            return 'html/replies.html';
        } else if(path == "sent_requests") {
            return 'html/sent_requests.html';
        } else if(path == "received_requests") {
            return 'html/received_requests.html';
        } else if(path == "following_quests") {
            return 'html/following_photoquests.html';
        } else if(path == "news") {
            return 'html/news.html';
        }

        return defaultContent;
    };

    Http.trySignInFromCookies($cookies, $timeout, $scope, $http, function(){
        $scope.getCenterPageContent = getCenterPageContent;
    });

    Utilities.applyLinksBehavior($location, $scope, $element);
});
