angular.module('infinite-scroll', []).directive('topInfiniteScroll', ['$timeout', '$http', '$interval',
    function($timeout, $http, $interval) {
    return function(scope, element, attr) {
        var raw = element[0];
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

            var scrollHeightBefore = raw.scrollHeight;
            Utilities.get($http, loadUrl, args, function(data) {
                data = data[attr.topInfiniteScroll];
                if(data.length <= 0){
                    return;
                }

                scope[attr.topInfiniteScroll].unshiftAll(data);
                $timeout(function(){
                    raw.scrollTop = raw.scrollHeight - scrollHeightBefore;
                });
                busy = false;
            });
        };



        scope.$watch(
            function() {
                return attr.stopped;
            },
            load
        );

        var handle = $interval(function() {
            if(busy){
                return;
            }

            var distance = attr.distance || 100;

            if (raw.scrollTop <= distance) {
                load();
            }
        });

        scope.$on('$destroy', function() {
            $interval.cancel(handle);
        });
    };
}]);