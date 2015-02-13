angular.module('main')
    .directive('searchSelect', function($location) {
        return {
            link: function(scope, element, attrs) {
                element = $(element);
                var hiddenA = $("<a style='display: none'></a>");
                element.parent().append(hiddenA);
                element.val(scope.getOrder());
                element.on('change', function () {
                    var valueSelected = this.value;
                    hiddenA.click();
                    document.location.href =
                        ControllerUtils.getAddSearchParamFunction($location, attrs.searchSelect, valueSelected)();
                    //$location.search(attrs.searchSelect, valueSelected);
                });
            }
        };
    });
