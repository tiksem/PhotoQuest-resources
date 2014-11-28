/**
 * Created by CM on 11/28/2014.
 */
Http = {
    loadUserToScope: function($scope, $http, userId, success) {
        Utilities.loadDataToScope(window.location.origin + "//getUserById", {
            id: userId
        }, $scope, $http, success);
    }
}
