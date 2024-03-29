var main = angular.module("main", ['ngDialog', 'angularFileUpload', 'ngCookies',
    'angularUtils.directives.dirPagination', 'djds4rce.angular-socialshare', 'infinite-scroll',
    'ngTagsInput', 'tiksem-keyboard', 'ngSanitize' /*HTML_TEMPLATES_PLACEHOLDER*/]);
main.run(['$FB', function($FB){
    $FB.init('1550292335235820');
}]);
main.controller("Main", function($http, $element, $timeout, $scope, $locale, $location, $cookies){
    ControllerUtils.initController($scope, $location);

    var setLang = $scope.setLang = function(lang) {
        $scope.lang = lang;
        $scope.tr = TRANSLATION[lang] || TRANSLATION["en"];
    };
    setLang((window.navigator.userLanguage || window.navigator.language).split("-")[0]);

    var onSignedInChanged = [];

    var isMobile = $scope.isMobile = Utilities.mobilecheck();
    var isAndroid = $scope.isAndroid = Utilities.isAndroid();
    $scope.isAndroidWelcome = function() {
        return $scope.getPath() == "welcome" && isAndroid;
    };

    var signedInUser = null;
    $scope.getSignedInUser = function() {
        return signedInUser;
    };
    $scope.setSignedInUser = function(user) {
        if(user === signedInUser){
            return;
        }

        if(!user){
            signedInUser.statsUpdater.destroy();
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

        if(!signedInUser){
            defaultContent = 'html/welcome.html';
        }

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
        } else if(path == "request") {
            return 'html/request.html';
        } else if(path == "progress") {
            return 'html/progress.html';
        } else if(path == "quests") {
            return 'html/photoquests.html';
        } else if(path == "photo"){
            if(id && id.isNumber()){
                return 'html/photo.html';
            }
        } else if(path == "profile") {
            if(id && id.isNumber()){
                return 'html/profile.html';
            }
        } else if(path == "photos"){
            if(id && id.isNumber()){
                return 'html/photos.html';
            }
        } else if(path == "friends" && id && id.isNumber()){
            return 'html/friends.html';
        } else if(path == "register") {
            return 'html/register_dialog.html';
        } else if(path == "welcome" && !signedInUser) {
            return 'html/welcome.html';
        } else if(path == "about") {
            return 'html/about.html';
        } else if(path == "following_quests") {
            if(id && id.isNumber()) {
                return 'html/photoquests.html';
            }
        } else if(path == "performed_quests") {
            if(id && id.isNumber()) {
                return 'html/photoquests.html';
            }
        } else if(path == "created_quests") {
            if(id && id.isNumber()) {
                return 'html/photoquests.html';
            }
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
            } else if(path == "news") {
                return 'html/news.html';
            } else if(path == "settings") {
                return 'html/settings.html';
            }
        }

        $location.search("path", signedInUser ? "quests" : "welcome");

        return defaultContent;
    };

    Http.trySignInFromCookies($cookies, $timeout, $scope, $http, function(){
        $scope.getCenterPageContent = getCenterPageContent;
    });

    Utilities.applyLinksBehavior($location, $scope, $element)();
});
