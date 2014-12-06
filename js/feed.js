var main = angular.module("main");
main.controller("FeedController", function($scope, $location, $element, $http){
    var url = "//getNews";
    var countUrl = "//getNewsCount";

    var search = $location.search();
    var requestType = search["path"];
    var args = {
        userId: search["id"]
    };

    PhotoquestUtils.initPagination($scope, $http, $location, {
        url: url,
        countUrl: countUrl,
        args: args,
        scopeArrayName: "feeds"
    });

    Utilities.applyStylesToHtml($element);
});
