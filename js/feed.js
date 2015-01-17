var main = angular.module("main");
main.controller("FeedController", function($scope, $location, $element, $http, $timeout){
    var url = "//getNews";
    var countUrl = "//getNewsCount";

    $scope.likePhoto = function(photo) {
        var params = {
            photoId: photo.id
        };

        Http.toggleLikeState($http, photo, params);
    };

    PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
        url: url,
        countUrl: countUrl,
        args: function(){
            return {
                userId: $location.search()["id"]
            }
        },
        scopeArrayName: "feeds"
    });

    Utilities.applyLinksBehavior($location, $scope, $element)();
});
