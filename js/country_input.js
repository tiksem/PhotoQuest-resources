angular.module('main')
    .directive('countryInput', function() {
        return {
            scope: {

            },
            link: function(scope, element, attrs) {
                var $scope = scope.$parent;
                element = $(element);
                element.autocomplete({
                    autoSelectFirst: true,
                    serviceUrl: '/getCountrySuggestions',
                    onSelect: function(suggestion) {
                        $scope.$apply(function(){
                            $scope.country = suggestion.id;
                        });

                        var onChange = function(){
                            element.unbind('change', onChange);
                            $scope.$apply(function(){
                                delete $scope.country;
                                element.val("");
                            });
                        };
                        element.change(onChange);
                    }
                });
            }
        };
    });
