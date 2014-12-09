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
        $scope.getFilterHref = function(query) {
            var search = $location.search();
            search["filter"] = query;
            return Utilities.searchToUrlPart(search);
        }
    }
};
