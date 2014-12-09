PhotoquestUtils = {};
PhotoquestUtils.initPagination = function($scope, $http, $location, $element, params) {
    ControllerUtils.initPaginationController($scope, $location);

    $scope.pageSize = params.pageSize || 10;
    $scope.totalItems = 0;

    var url = params.url;
    var countUrl = params.countUrl ? window.location.origin + params.countUrl : undefined;
    var args = params.args;
    var countArgs = params.countArgs || args;
    var success = params.success;
    var scopeArrayName = params.scopeArrayName;
    var onPageChanged = params.onPageChanged;
    var reloadOnUserCounterChanged = params.reloadOnUserCounterChanged;
    var countProvider = params.countProvider;
    var initialPath = $location.search()["path"];
    var onLoadingStarted = params.onLoadingStarted;

    var updatePageNumber = function() {
        $scope.pageNumber = $location.search()["page"] || 1;
    };

    var checkPath = function() {
        return $location.search()["path"] === initialPath;
    };

    if(countProvider){
        $scope.$watch(
            countProvider,
            function(newValue) {
                $scope.totalItems = newValue || 0;
            }
        );
    }

    if(!scopeArrayName){
        throw new Error("define scopeArrayName");
    }

    var getOrder = params.getOrder || function() {
        return $location.search()["order"] || "newest"
    };

    var getTotalItems = function(callback) {
        if (countUrl) {
            Utilities.getTotalCount(countUrl, countArgs, $http, function (count) {
                $scope.totalItems = count;
                callback(count);
            });
        } else {
            $scope.totalItems = countProvider();
            callback();
        }
    };

    var loadPages = function(limit, offset, shouldAppend) {
        var urlParams = {
            offset: offset || (($scope.pageNumber - 1) * $scope.pageSize),
            limit: limit || $scope.pageSize,
            order: getOrder()
        };

        if(onLoadingStarted){
            onLoadingStarted();
        }

        Utilities.addProperties(urlParams, args);
        Utilities.get($http, url, urlParams, function(data){
            if (!shouldAppend) {
                $scope[scopeArrayName] = data[scopeArrayName];
            } else {
                $scope[scopeArrayName].pushAll(data[scopeArrayName]);
            }

            $scope.contentIsLoading = false;

            if(success){
                success();
            }
        });
    };

    var loadData = function() {
        $scope.contentIsLoading = true;
        updatePageNumber();
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
            return (user ? user.id : "null");
        },
        function() {
            if(checkPath()){
                loadData();
            }
        }
    );

    $scope.$on('$locationChangeStart', function(event) {
        if(checkPath()){
            loadData();
        }
    });

    return {
        loadData: loadData
    }
};
