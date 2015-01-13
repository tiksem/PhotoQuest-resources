angular.module('main')
    .directive('tabLink', function($compile) {
        return {
            link: function(scope, element, attrs) {
                element = $(element);
                element.addClass("tab");

                var onDisabledClick = function(event) {
                    event.preventDefault();
                };

                var onEnabledClick = function() {
                    var tabs = element.parent().parent().find("a.tab");
                    tabs.removeClass("activeTab");
                    element.addClass("activeTab");
                };

                element.click(onEnabledClick);

                attrs.$observe('disabledTab', function(isDisabled){
                    if (isDisabled === "true") {
                        element.addClass("disabledTab");
                        element.click(onDisabledClick);
                    } else {
                        element.removeClass("disabledTab");
                        element.click(onEnabledClick);
                    }
                });
            }
        };
    });