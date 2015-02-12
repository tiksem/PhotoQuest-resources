ControllerUtils = {
    getAddSearchParamFunction: function($location, key, value) {
        return function() {
            var search = $location.search();
            var copy = {};
            Utilities.addProperties(copy, search);
            copy[key] = value;
            Utilities.deleteUndefinedValues(copy);
            return Utilities.searchToUrlPart(copy);
        };
    },
    initController: function($scope, $location) {
        $scope.getNewestHref = this.getAddSearchParamFunction($location, "order", "newest");
        $scope.getMostRatedHref = this.getAddSearchParamFunction($location, "order", "rated");
        $scope.getHottestHref = this.getAddSearchParamFunction($location, "order", "hottest");
        $scope.getSearchHref = function() {
            var search = $location.search();
            var copy = {};
            Utilities.addProperties(copy, search);
            if ($scope.filter) {
                copy.filter = $scope.filter;
            } else {
                delete copy.filter;
            }
            if ($scope.city) {
                copy.cityId = $scope.city;
                delete copy.countryId;
            } else {
                delete copy.cityId;
                if($scope.country){
                    copy.countryId = $scope.country;
                }
            }
            if ($scope.gender) {
                copy.gender = $scope.gender;
            } else {
                delete copy.gender;
            }
            Utilities.deleteUndefinedValues(copy);
            return Utilities.searchToUrlPart(copy);
        };

        var that = this;
        $scope.getPathChangeHref = function(newPath) {
            return that.getAddSearchParamFunction($location, "path", newPath)();
        };

        $scope.getChangeHref = function(key, value) {
            return that.getAddSearchParamFunction($location, key, value)();
        };

        $scope.getDisplayDate = function(addingDate) {
            return Utilities.getDisplayDate(addingDate);
        };

        $scope.getPath = function() {
            return $location.search()["path"];
        };

        $scope.getCategory = function() {
            return $location.search()["category"] || "all";
        };

        $scope.getId = function() {
            return parseInt($location.search()["id"]);
        };

        $scope.getOrder = function() {
            var order =  $location.search()["order"];
            if(!order){
                order = "newest";
            }

            return order;
        };

        $scope.getGender = function() {
            var gender = $location.search()["gender"];
            if(gender){
                return gender;
            }

            return "";
        };

        $scope.getFilter = function() {
            return $location.search()["filter"];
        };

        $scope.Utilities = Utilities;
    },
    initProfileButtons: function($scope, $http) {
        $scope.addOrRemoveFriend = function(user, decline) {
            var params = {
                id: user.id
            };

            var removeFriend = user.relation == "friend" || user.relation == "request_sent" || decline;
            var url = removeFriend ? "//removeFriend" : "//addFriend";

            user.addFriendLoading = true;

            Utilities.get($http, url, params, {
                success: function() {
                    if(removeFriend){
                        if (!decline) {
                            delete user.relation;
                        } else {
                            user.relation = "followed";
                        }
                    } else {
                        if(user.relation == "request_received"){
                            user.relation = "friend";
                        } else {
                            user.relation = "request_sent";
                        }
                    }
                },
                finished: function() {
                    user.addFriendLoading = false;
                }
            });
        };

        $scope.getToggleFriendStatusButtonName = function(user) {
            var relation = user.relation;
            if(relation == "friend"){
                return "Remove friend";
            } else if(relation == "request_sent") {
                return "Cancel friend request"
            } else if(relation == "request_received") {
                return "Accept friend request"
            } else if(relation == "follows") {
                return "Unfollow"
            } else if(relation == "followed") {
                return "Accept friend request"
            } else {
                return "Add friend";
            }
        };
    }
};
