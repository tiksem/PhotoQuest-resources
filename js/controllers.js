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
            if ($scope.placeId) {
                copy.location = $scope.placeId;
            } else {
                delete copy.location;
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

        $scope.getDisplayDate = function(addingDate) {
            return Utilities.getDisplayDate(addingDate);
        };

        $scope.getPath = function() {
            return $location.search()["path"];
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
        }
    },
    initProfileButtons: function($scope, $http) {
        $scope.addOrRemoveFriend = function(user, decline) {
            var config = {
                params: {
                    id: user.id
                }
            };

            var removeFriend = user.relation == "friend" || user.relation == "request_sent" || decline;
            var url = window.location.origin +
                (removeFriend ? "//removeFriend" : "//addFriend");

            $http.get(url, config).success(function(data){
                if(!data.error){
                    if(removeFriend){
                        if (!decline) {
                            delete user.relation;
                        } else {
                            user.relation = "follows";
                        }
                    } else {
                        if(user.relation == "request_received"){
                            user.relation = "friend";
                        } else {
                            user.relation = "request_sent";
                        }
                    }
                } else {
                    console.error(data);
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
