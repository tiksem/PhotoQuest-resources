angular.module('main')
    .directive('thumbnail', function() {
        return {
            restrict: 'E',
            scope: {
                size: '=size',
                src: '=src'
            },
            templateUrl: 'html/thumbnail.html'
        };
    });
