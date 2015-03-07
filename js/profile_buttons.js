angular.module('main')
    .directive('profileButtons', function() {
        return {
            scope: true,
            templateUrl: 'html/profile_buttons.html'
        };
    });
