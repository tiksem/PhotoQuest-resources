angular.module('main')
    .directive('profileButtons', function() {
        return {
            scope: true,
            templateUrl: 'html/user_buttons.html'
        };
    });
