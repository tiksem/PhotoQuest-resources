var main = angular.module("main");
main.controller("PeopleController", function($scope, $location, $element, ngDialog, $http, $timeout){
    ControllerUtils.initProfileButtons($scope, $http);

    var requestType;
    var init = function() {
        var url;
        var countUrl;
        var countProvider;
        requestType = $location.search()["path"];
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

        PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
            url: url,
            countUrl: countUrl,
            scopeArrayName: "users",
            countProvider: countProvider,
            success: function(data) {
                var location = data.location;
                if(!location){
                    location = {};
                }

                $scope.city = location.cityId;
                $scope.country = location.countryId;
                $scope.cityName = location.cityName;
                $scope.countryName = location.countryName;
            }
        });
    };
    init();

    var checkPath = function() {
        var path = $location.search()["path"];
        var result = (path == "people" || path == "friends" ||
            path == "sent_requests" || path == "received_requests") &&
                requestType != path;

        return result;
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        if(checkPath()){
            init();
        }
    });

    Utilities.applyLinksBehavior($location, $scope, $element)();
});