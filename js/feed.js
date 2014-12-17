var main = angular.module("main");
main.controller("FeedController", function($scope, $location, $element, $http, $timeout){
    var url = "//getNews";
    var countUrl = "//getNewsCount";

    var search = $location.search();
    var requestType = search["path"];
    var args = {
        userId: search["id"]
    };

    PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
        url: url,
        countUrl: countUrl,
        args: args,
        scopeArrayName: "feeds"
    });

    Utilities.applyLinksBehavior($scope, $element);
});
