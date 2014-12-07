angular.module('main').directive("refreshInclude", ["$rootScope", "$location", "$compile",
    function($rootScope, $location, $compile){
    return {
        scope: {
            url: "=url"
        },
        link: function($scope, $element) {
            var element = $($element);
            var update = function() {
                var value = "'" + $scope.url + "'";
                element.html("");
                var content = $compile("<div ng-include=\"" + value + "\"></div>")($scope.$parent);
                element.append(content);
            };

            update();
            $scope.$on('$locationChangeStart', update);
        }
    };
}]);