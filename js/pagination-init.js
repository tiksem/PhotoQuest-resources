PhotoquestUtils = {};
PhotoquestUtils.initPagination = function($scope, $http, $location, params) {
    $scope.pageSize = params.pageSize || 10;
    $scope.totalItems = 0;
    $scope.pageNumber = $location.search()["page"] || 1;
    var url = params.url;
    var countUrl = window.location.origin + params.countUrl;
    var args = params.args;
    var countArgs = params.countArgs || args;
    var success = params.success;
    var scopeArrayName = params.scopeArrayName;
    var onPageChanged = params.onPageChanged;
    var reloadOnUserCounterChanged = params.reloadOnUserCounterChanged;

    if(!scopeArrayName){
        throw new Error("define scopeArrayName");
    }

    var getOrder = params.getOrder || function() {
        return $location.search()["order"] || "newest"
    };

    var getTotalItems = function(callback) {
        Utilities.getTotalCount(countUrl, countArgs, $http, function(count){
            $scope.totalItems = count;
            callback(count);
        });
    };

    var loadPages = function(limit, offset, shouldAppend) {
        var urlParams = {
            offset: offset || (($scope.pageNumber - 1) * $scope.pageSize),
            limit: limit || $scope.pageSize,
            order: getOrder()
        };

        Utilities.addProperties(urlParams, args);
        Utilities.get($http, url, urlParams, function(data){
            if (!shouldAppend) {
                $scope[scopeArrayName] = data[scopeArrayName];
            } else {
                $scope[scopeArrayName].pushAll(data[scopeArrayName]);
            }

            if(success){
                success();
            }
        });
    };

    var loadData = function() {
        $scope[scopeArrayName] = [];
        if($scope.totalItems){
            loadPages();
        } else {
            getTotalItems(function(){
                if (reloadOnUserCounterChanged) {
                    Utilities.addCounterWatcher($scope, {
                        valueProvider: function () {
                            var user = $scope.getSignedInUser();
                            if (user) {
                                return user[reloadOnUserCounterChanged];
                            }
                        },
                        onIncrease: function (dif) {
                            if ($scope.pageNumber === 1) {
                                loadData();
                            }
                        }
                    });
                }

                loadPages();
            });
        }
    };

    $scope.onPageChanged = function(pageNumber) {
        if(onPageChanged){
            onPageChanged();
        }

        $location.search("page", pageNumber);
        $scope.pageNumber = pageNumber;
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
