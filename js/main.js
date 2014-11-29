var main = angular.module("main", ['ngDialog', 'angularFileUpload', 'ngCookies',
    'angularUtils.directives.dirPagination', 'infinite-scroll']);
main.controller("Main", function($http, $scope, $location, $cookies){
    var signedInUser = null;
    $scope.getSignedInUser = function() {
        return signedInUser;
    };
    $scope.setSignedInUser = function(user) {
        signedInUser = user;
    };

    var getCenterPageContent = function(){
        var defaultContent = 'html/photoquests.html'
        var hash = $location.hash();
        if(!hash){
            return defaultContent;
        }

        var query = Utilities.parseQuery(hash);
        var path = query["path"];
        var id = query["id"];

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
        }

        return defaultContent;
    }

    Http.trySignInFromCookies($cookies, $scope, $http, function(){
        $scope.getCenterPageContent = getCenterPageContent;
    });
})
