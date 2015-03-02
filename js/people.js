var main = angular.module("main");
main.controller("PeopleController", function($scope, $location, $element, ngDialog, $http, $timeout){
    ControllerUtils.initProfileButtons($scope, $http);

    var tr = $scope.tr;

    var requestType;
    var id;

    var initPagination = function() {
        var url;
        var countUrl;
        var countProvider;

        if(requestType == "friends"){
            url = "//friends";
            countUrl = "//getFriendsCount";
        } else if(requestType == "people") {
            url = "//users";
            countUrl = "//getUsersCount";
        } else if(requestType == "received_requests") {
            url = "//getReceivedFriendRequests";
            countUrl = "//getReceivedRequestsCount";
        } else if(requestType == "sent_requests") {
            url = "//getSentFriendRequests";
            countUrl = "//getSentRequestsCount";
        }

        $scope.showFriendTabs = requestType !== "people" && (requestType !== "friends" || !id);

        PhotoquestUtils.initPagination($scope, $http, $location, $element, $timeout, {
            url: url,
            countUrl: countUrl,
            scopeArrayName: "users",
            args: {
                id: id
            },
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

        $scope.gender = $scope.getGender();
        $scope.filter = $scope.getFilter();
    };

    var init = function() {
        var search = $location.search();
        requestType = search["path"];
        id = search.id;

        var signedInUser = $scope.getSignedInUser();
        if(!id || (signedInUser && id == signedInUser.id)){
            $scope.user = signedInUser;
            initPagination();
        } else {
            Http.loadUserToScope($scope.user = {}, $http, id, function(){
                initPagination();
            });
        }
    };
    init();

    $scope.getTitle = function() {
        var search = $location.search();
        var path = search.path;

        if(path == "people"){
            return $scope.tr.people;
        } else if(path == "received_requests") {
            return $scope.tr.receivedFriendRequests;
        } else if(path == "sent_requests") {
            return $scope.tr.sentFriendRequests;
        } else if(path == "friends") {
            if(search.id){
                try {
                    var user = $scope.user;
                    return $scope.tr.friends;
                } catch (e) {
                    return $scope.tr.friends;
                }
            } else {
                return $scope.tr.friends;
            }
        }
    };

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