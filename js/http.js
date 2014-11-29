/**
 * Created by CM on 11/28/2014.
 */
Http = {
    loadUserToScope: function($scope, $http, userId, success) {
        Utilities.loadDataToScope(window.location.origin + "//getUserById", {
            id: userId
        }, $scope, $http, success);
    },
    signout: function($http) {
        $http.get(window.location.origin + "//logout").success(function(data){
            if (!data.error) {
                $scope.setSignedInUser(null);
                alert("Success!");
            } else {
                var message = data.error + " " + data.message;
                alert(message);
                console.error(message);
            }
        })
    }
}
