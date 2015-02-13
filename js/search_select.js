angular.module('main')
    .directive('searchSelect', function($location) {
        return {
            link: function(scope, element, attrs) {
                element = $(element);
                element.val(scope.getOrder());
                element.on('change', function () {
                    var valueSelected = this.value;
                    document.location.href =
                        ControllerUtils.getAddSearchParamFunction($location, attrs.searchSelect, valueSelected)();
                    //$location.search(attrs.searchSelect, valueSelected);
                });
            }
        };
    });
