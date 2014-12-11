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
    initPaginationController: function($scope, $location) {
        $scope.getNewestHref = this.getAddSearchParamFunction($location, "order", "newest");
        $scope.getMostRatedHref = this.getAddSearchParamFunction($location, "order", "rated");
        $scope.getSearchHref = function() {
            var search = $location.search();
            var copy = {};
            Utilities.addProperties(copy, search);
            if ($scope.filter) {
                copy.filter = $scope.filter;
            }
            if ($scope.placeId) {
                copy.location = $scope.placeId;
            }
            Utilities.deleteUndefinedValues(copy);
            return Utilities.searchToUrlPart(copy);
        };

        $scope.getDisplayDate = function(addingDate) {
            return Utilities.getDisplayDate(addingDate);
        }
    }
};
