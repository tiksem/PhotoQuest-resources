PhotoquestUtils = {};
PhotoquestUtils.initPagination = function($scope, $http, $location, $element, $timeout, params) {
    ControllerUtils.initController($scope, $location);

    if($scope.___paginationInit){
        $scope.___paginationInit();
    }

    $scope.pageSize = params.pageSize || $scope.pageSize || 10;
    $scope.totalItems = 0;

    var url = params.url;
    var countUrl = params.countUrl;
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
        return $location.search()["order"] || "rated"
    };

    var getTotalItems = function(callback) {
        if (countUrl) {
            var countUrlArg = countUrl;
            if(typeof countUrl === "function"){
                countUrlArg = countUrl();
            }

            var search = $location.search();
            var urlParams = {
                filter: search["filter"],
                cityId: search["cityId"]
            };

            var gender = search.gender;
            if(gender !== undefined){
                urlParams.gender = gender === "male"
            }

            if(!urlParams.cityId && search.countryId){
                urlParams.countryId = search.countryId;
            }

            var params = countArgs;
            if (typeof countArgs === "function") {
                params = countArgs();
            }

            Utilities.addProperties(urlParams, params);
            Utilities.get($http, countUrlArg, urlParams, {
                success: function (data) {
                    var count = data.count;
                    $scope.totalItems = count;
                    callback(count);
                },
                error: function() {
                    $scope.contentIsLoading = false;
                }
            });
        } else {
            $scope.totalItems = countProvider();
            callback();
        }
    };

    var loadPages = function(limit, offset, shouldAppend) {
        var search = $location.search();
        var urlParams = {
            offset: offset || (($scope.pageNumber - 1) * $scope.pageSize),
            limit: limit || $scope.pageSize,
            filter: search["filter"],
            cityId: search["cityId"],
            order: getOrder()
        };

        if(!urlParams.cityId && search.countryId){
            urlParams.countryId = search.countryId;
        }

        var gender = search.gender;
        if(gender !== undefined){
            urlParams.gender = gender === "male"
        }

        if(onLoadingStarted){
            onLoadingStarted();
        }

        var params = args;
        if (typeof args === "function") {
            params = args();
        }

        Utilities.addProperties(urlParams, params);
        var urlArg = url;
        if(typeof url === "function"){
            urlArg = url();
        }

        Utilities.get($http, urlArg, urlParams, {
            success: function(data){
                if (!shouldAppend) {
                    $scope[scopeArrayName] = data[scopeArrayName];
                } else {
                    $scope[scopeArrayName].pushAll(data[scopeArrayName]);
                }

                $timeout(function(){
                    Utilities.applyLinksBehavior($location, $scope, $element)();
                    updateScroll();
                });

                if(success){
                    success(data);
                }
            },
            finished: function() {
                $scope.contentIsLoading = false;
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
        if(pageNumber === ($location.search()["page"] || 1)) {
            return;
        }

        if(onPageChanged){
            onPageChanged();
        }

        $location.search("page", pageNumber);
        $scope.pageNumber = pageNumber;
    };

    var unwatch = $scope.$watch(
        function($scope) {
            return $scope.getSignedInUser();
        },
        function() {
            if(checkPath()){
                loadData();
            }
        }
    );

    var off = $scope.$on('$locationChangeStart', function(event, next, current) {
        if(checkPath()){
            delete $scope.totalItems;
            loadData();
        }
    });

    var updateScroll = Utilities.applyLinksBehavior($location, $scope, $element);

    $scope.___paginationInit = function() {
        unwatch();
        off();
    };

    return {
        loadData: loadData
    }
};
