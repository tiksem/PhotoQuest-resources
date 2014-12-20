var app = angular.module('tiksem-keyboard', []);
app.directive('shortcut', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: function postLink(scope, iElement, iAttrs){
            var handler = function (e) {
                scope.$apply(scope.keyPressed(e));
            };
            jQuery(document).on('keyup', handler);

            scope.$on("$destroy", function(){
                jQuery(document).off('keyup', handler);
            })
        }
    };
});