ControllerUtils = {
    getAddSearchParamFunction: function($location, key, value) {
        return function() {
            var search = $location.search();
            var copy = {};
            Utilities.addProperties(copy, search);
            copy[key] = value;
            return Utilities.searchToUrlPart(copy);
        };
    },
    initPaginationController: function($scope, $location) {
        $scope.getNewestHref = this.getAddSearchParamFunction($location, "order", "newest");
        $scope.getMostRatedHref = this.getAddSearchParamFunction($location, "order", "rated");
        $scope.getSearchHref = function() {
            var search = $location.search();
            search["filter"] = $scope.filter;
            search["location"] = $scope.placeId;
            Utilities.deleteUndefinedValues(search);
            return Utilities.searchToUrlPart(search);
        };

        $scope.getDisplayDate = function(addingDate) {
            return Utilities.getDisplayDate(addingDate);
        }
    }
};
