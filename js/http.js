/**
 * Created by CM on 11/28/2014.
 */
Http = {
    loadUserToScope: function($scope, $http, userId, success) {
        Utilities.loadDataToScope(window.location.origin + "//getUserById", {
            id: userId
        }, $scope, $http, success);
    },
    signout: function($scope, $http) {
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
    },
    signin: function($scope, $http, login, password, callback) {
        callback = callback || function(){};

        if(login == ""){
            alert("Enter login!");
            return;
        }

        if(password == ""){
            alert("Enter password");
            return;
        }

        var config = {
            params: {
                login: login,
                password: password
            }
        };
        $http.get(window.location.origin + "//login",config).success(function(data){
            if (!data.error) {
                $scope.setSignedInUser(data);
                console.log("login success");
                console.log(data);
            } else {
                var message = data.error + " " + data.message;
                alert(message);
                console.error(message);
            }
            callback();
        }).error(callback);
    },
    trySignInFromCookies: function($cookies, $scope, $http, callback) {
        var login = $cookies.login;
        var password = $cookies.password;
        if(login && password){
            Http.signin($scope, $http, login, password, callback);
        } else {
            callback();
        }
    }
}
