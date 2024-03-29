angular.module('main')
    .directive('locationInput', function() {
        return {
            scope: {
                clearValue: "=clearValue"
            },
            link: function(scope, element, attrs) {
                var $scope = scope.$parent;
                element = $(element);
                element.autocomplete({
                    serviceUrl: '/getLocationSuggestions',
                    onSelect: function(suggestion) {
                        $scope.$apply(function(){
                            $scope.country = suggestion.country;
                            $scope.city = suggestion.city;
                            $scope.placeId = suggestion.placeId;
                        });
                        if (attrs.clearValue) {
                            element.val("");
                        } else {
                            var onChange = function(){
                                element.unbind('change', onChange);
                                $scope.$apply(function(){
                                    delete $scope.country;
                                    delete $scope.city;
                                    delete $scope.placeId;
                                });
                            };
                            element.change(onChange);
                        }
                    }
                });
            }
        };
    });
