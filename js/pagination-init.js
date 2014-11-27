PhotoquestUtils = {};
PhotoquestUtils.initPagination = function($scope, $http, params) {
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

    var getTotalItems = function(callback) {
        Utilities.getTotalCount(countUrl, countArgs, $http, function(count){
            $scope.totalItems = count;
            callback(count);
        });
    };

    var loadPages = function() {
        var urlParams = {
            offset: $scope.pageNumber * $scope.pageSize,
            limit: $scope.pageSize
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

    loadData();

    $scope.onPageChanged = function(pageNumber) {
        $scope.pageNumber = pageNumber - 1;
        loadData();
    };

    // reload data, when user sign out/sign in
    $scope.$watch(
        function($scope) {
            return $scope.getSignedInUser();
        },
        loadData
    );

    return {
        loadData: loadData
    }
};
