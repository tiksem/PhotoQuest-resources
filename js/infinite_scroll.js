angular.module('infinite-scroll', []).directive('topInfiniteScroll', ['$timeout', '$http', '$interval',
    function($timeout, $http, $interval) {
    return function(scope, element, attr) {
        var busy = false;
        var scrollPositionUpdated = false;
        var loadingFlag = attr.loadingFlag;

        var load = function() {
            if(busy){
                return;
            }

            if(attr.stopped == "true"){
                return;
            }

            var scopeArray = scope[attr.topInfiniteScroll] = scope[attr.topInfiniteScroll] || [];

            var loadUrl = attr.loadUrl;
            if(!loadUrl){
                return;
            }

            var pageSize = attr.pageSize || 10;

            busy = true;
            var args = {
                offset: scopeArray.length,
                limit: pageSize
            };

            if(loadingFlag){
                scope.$parent[loadingFlag] = true;
            }

            Utilities.get($http, loadUrl, args, function(data) {
                data = data[attr.topInfiniteScroll];
                if(data.length <= 0){
                    return;
                }

                scope[attr.topInfiniteScroll].unshiftAll(data);

                if(loadingFlag){
                    scope.$parent[loadingFlag] = false;
                }

                busy = false;
            });
        };



        scope.$watch(
            function() {
                return attr.stopped;
            },
            load
        );

        scope.$watch(
            function() {
                return scope[attr.topInfiniteScroll].length;
            },
            function() {
                $timeout(function(){
                    $(element).scrollTop(element[0].scrollHeight);
                });
            }
        );

        var handle = $interval(function() {
            if(busy){
                return;
            }

            var distance = attr.distance || 100;

            if (element[0].scrollTop <= distance) {
                load();
            }
        });

        scope.$on('$destroy', function() {
            $interval.cancel(handle);
        });
    };
}]).directive('showMoreLoad', function($http, $interval, $timeout){
    return {
        link: function(scope, element, attr) {
            var showMoreId = attr.showMoreId;
            var scopeArrayName = attr.showMoreLoad;
            var scopeArray = scope.$parent[scopeArrayName] = [];
            var showMoreButton = $(element).find("#" + showMoreId);
            var upDirection = attr.direction === "up";
            var loadingFlag = attr.loadingFlag;

            var reloadFuncName = attr.reloadFuncName;
            if(reloadFuncName){
                scope.$parent[reloadFuncName] = function(clearScope) {
                    load(clearScope);
                }
            }

            var firstLoad = true;
            var lastScrollHeight = 0;

            var loadCallbacks = {
                success: function(data) {
                    if (!loadRequested) {
                        var arr = data[scopeArrayName];
                        if (arr.length < attr.limit) {
                            showMoreButton.remove();
                        }

                        if (!upDirection) {
                            scopeArray.pushAll(arr);
                        } else {
                            scopeArray.unshiftAll(arr);
                        }
                    }
                },
                finished: function() {
                    if(loadingFlag){
                        scope.$parent[loadingFlag] = false;
                    }

                    showMoreButton.show();
                    stopped = false;

                    if(firstLoad){
                        if (upDirection) {
                            $timeout(function () {
                                lastScrollHeight = element[0].scrollHeight;
                                $(element).scrollTop(lastScrollHeight);
                            });
                        }
                        firstLoad = false;
                    } else {
                        if (upDirection) {
                            $timeout(function () {
                                var scrollHeight = element[0].scrollHeight;
                                $(element).scrollTop(scrollHeight - lastScrollHeight);
                                lastScrollHeight = scrollHeight;
                            });
                        }
                    }
                }
            };

            var loadRequested = false;
            var stopped = false;
            var isStopped = function() {
                return stopped || attr.stopped === true || attr.stopped === "true";
            };

            var load = function(clearScope) {
                if(isStopped()){
                    loadRequested = true;
                    return;
                }
                if(clearScope === true){
                    scopeArray = scope.$parent[scopeArrayName] = [];
                }

                if(loadingFlag){
                    scope.$parent[loadingFlag] = true;
                }

                loadRequested = false;
                stopped = true;
                showMoreButton.hide();
                Utilities.get($http, attr.url, {
                    limit: attr.limit,
                    offset: scopeArray.length
                }, loadCallbacks);
            };

            var urlProvider = function() {
                return attr.url;
            };
            Http.runRequestPeriodically(scope, $http, $timeout, urlProvider, {
                onPreRequest: function() {
                    if(isStopped()){
                        return false;
                    }

                    return scopeArray.length > 0;
                },
                args: function() {
                    var index = upDirection ? scopeArray.length - 1 : 0;
                    return {
                        afterId: scopeArray[index].id
                    }
                },
                success: function(data) {
                    var arr = data[scopeArrayName];
                    var length = arr.length;
                    if (!upDirection) {
                        for (var i = length - 1; i >= 0; i--) {
                            scopeArray.unshift(arr[i]);
                        }
                    } else {
                        for (var i = 0; i < length; i++) {
                            scopeArray.push(arr[i]);
                        }
                    }
                }
            });

            scope.$watch(
                isStopped,
                function() {
                    if(loadRequested){
                        load();
                    }
                }
            );

            load();

            showMoreButton.click(load);
        }
    };
});