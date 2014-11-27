PhotoquestUtils = {};
PhotoquestUtils.initPagination = function($scope, $http, $location, params) {
    $scope.pageSize = params.pageSize || 10;
    $scope.totalItems = 0;
    $scope.pageNumber = 0;
    var url = window.location.origin + params.url;
    var countUrl = window.location.origin + params.countUrl;
    var args = params.args;
    var countArgs = params.countArgs || args;
    var success = params.success;
    var scopeArrayName = params.scopeArrayName;
    if(!scopeArrayName){
        throw new Error("define scopeArrayName");
    }

    var getOrder = params.getOrder || function() {
        return Utilities.parseQuery($location.hash())["order"] || "newest"
    };

    var getTotalItems = function(callback) {
        Utilities.getTotalCount(countUrl, countArgs, $http, function(count){
            $scope.totalItems = count;
            callback(count);
        });
    };

    var loadPages = function() {
        var urlParams = {
            offset: $scope.pageNumber * $scope.pageSize,
            limit: $scope.pageSize,
            order: getOrder()
        };

        Utilities.addProperties(urlParams, args);
        Utilities.loadDataToScope(url, urlParams, $scope, $http, success);
    };

    var loadData = function() {
        $scope[scopeArrayName] = [];
        if($scope.totalItems){
            loadPages();
        } else {
            getTotalItems(function(){
                loadPages();
            });
        }
    };

    $scope.onPageChanged = function(pageNumber) {
        $scope.pageNumber = pageNumber - 1;
        loadData();
    };

    $scope.$watch(
        function($scope) {
            var user = $scope.getSignedInUser();
            return getOrder() + " " + (user ? user.id : "null");
        },
        loadData
    );

    return {
        loadData: loadData
    }
};
