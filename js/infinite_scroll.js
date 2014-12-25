angular.module('infinite-scroll', []).directive('topInfiniteScroll', ['$timeout', '$http', '$interval',
    function($timeout, $http, $interval) {
    return function(scope, element, attr) {
        var busy = false;
        var scrollPositionUpdated = false;

        var updateScrollPosition = function() {
            if(!scrollPositionUpdated && raw.scrollHeight > 0){
                raw.scrollTop = raw.scrollHeight;
                scrollPositionUpdated = true;
            }
        };

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

            Utilities.get($http, loadUrl, args, function(data) {
                data = data[attr.topInfiniteScroll];
                if(data.length <= 0){
                    return;
                }

                scope[attr.topInfiniteScroll].unshiftAll(data);

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

            var loadCallbacks = {
                success: function(data) {
                    var arr = data[scopeArrayName];
                    if(arr.length < attr.limit){
                        showMoreButton.remove();
                    }

                    scopeArray.pushAll(arr);
                },
                finished: function() {
                    showMoreButton.show();
                }
            };

            var loadRequested = false;

            var load = function() {
                if(attr.stopped === true || attr.stopped === "true"){
                    loadRequested = true;
                    return;
                }

                loadRequested = false;
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
                    var stopped = attr.stopped;
                    if (stopped === true || stopped === "true") {
                        return false;
                    }

                    return scopeArray.length > 0;
                },
                args: function() {
                    return {
                        startingDate: scopeArray[0].addingDate
                    }
                },
                success: function(data) {
                    var arr = data[scopeArrayName];
                    for(var i = arr.length - 1; i >= 0; i--) {
                        scopeArray.unshift(arr[i]);
                    }
                }
            });

            scope.$watch(
                function() {
                    return attr.stopped;
                },
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