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
                $scope.unreadMessagesCountUpdater.destroy();
            } else {
                var message = data.error + " " + data.message;
                alert(message);
                console.error(message);
            }
        })
    },
    signin: function($scope, $timeout, $http, login, password, callback) {
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

                $scope.unreadMessagesCountUpdater = new Http.RemoteValueUpdater($http, $timeout, {
                    url: '/getUnreadMessagesCount',
                    args: {
                        userId: data.id
                    },
                    onValueChanged: function(oldValue, newValue) {
                        $scope.getSignedInUser().unreadMessagesCount = newValue;
                        if (oldValue && newValue > oldValue) {
                            console.log("Message received");
                        }
                    },
                    valueProvider: function(data) {
                        return data.result;
                    }
                });

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
    trySignInFromCookies: function($cookies, $timeout, $scope, $http, callback) {
        var login = $cookies.login;
        var password = $cookies.password;
        if(login && password){
            Http.signin($scope, $timeout, $http, login, password, callback);
        } else {
            callback();
        }
    },
    RemoteValueUpdater: function($http, $timeout, params) {
        var valueProvider = params.valueProvider;
        var onValueChanged = params.onValueChanged;
        var value;
        var handle;

        var runTimeout = function() {
            handle = $timeout(function(){
                callback();
            }, params.interval || 2000);
        }

        var callback = function() {
            Utilities.get($http, params.url, params.args, {
                success: function(data){
                    var resolvedValue = valueProvider(data);
                    if(value !== resolvedValue){
                        onValueChanged(value, resolvedValue);
                        value = resolvedValue;
                    }
                },
                finished: function() {
                    runTimeout();
                }
            }, true);
        };

        runTimeout();

        this.destroy = function() {
            $timeout.cancel(handle);
        }
    },
    initValueUpdateOnScope: function($http, $timeout, $scope, params) {
        var updater = new this.RemoteValueUpdater($http, $timeout, params);
        $scope.$on('$destroy', function() {
            updater.destroy();
        });
    }
};
