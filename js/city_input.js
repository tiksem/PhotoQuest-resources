angular.module('main')
    .directive('cityInput', function() {
        return {
            scope: {

            },
            link: function(scope, element, attrs) {
                var $scope = scope.$parent;
                element = $(element);
                element.autocomplete({
                    autoSelectFirst: true,
                    serviceUrl: function() {
                        return document.location.origin + "//getCitySuggestions?countryId=" + $scope.country;
                    },
                    onSelect: function(suggestion) {
                        $scope.$apply(function(){
                            $scope.city = suggestion.id;
                        });

                        var onChange = function(){
                            element.unbind('change', onChange);
                            $scope.$apply(function(){
                                if (suggestion.value != element.val()) {
                                    delete $scope.city;
                                    element.val("");
                                }
                            });
                        };
                        element.change(onChange);
                    }
                });

                scope.$watch(function() {
                    return element.is(':visible')
                }, function(newValue, oldValue) {
                    if(oldValue === true && newValue === false){
                        element.val("");
                    }
                });
            }
        };
    });