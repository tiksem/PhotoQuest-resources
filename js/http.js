/**
 * Created by CM on 11/28/2014.
 */
Http = {
    loadUserToScope: function ($scope, $http, userId, success) {
        Utilities.loadDataToScope(window.location.origin + "//getUserById", {
            id: userId
        }, $scope, $http, success);
    },
    signout: function ($scope, $http) {
        $http.get(window.location.origin + "//logout").success(function (data) {
            if (!data.error) {
                $scope.setSignedInUser(null);
            } else {
                var message = data.error + " " + data.message;
                alert(message);
                console.error(message);
            }
        })
    },
    signin: function ($scope, $timeout, $http, login, password, callback) {
        callback = callback || {};

        callback.error = callback.error || function(){};

        var params = {
            login: login,
            password: password
        };

        Utilities.get($http, "//login", params, {
            success: function(data) {
                $scope.setSignedInUser(data);

                data.statsUpdater = new Http.RemoteValueUpdater($http, $timeout, {
                    url: "//getUserStats",
                    onValueChanged: function (oldValue, newValue) {
                        Utilities.addProperties($scope.getSignedInUser(), newValue);
                    },
                    interval: 2000
                });

                if(callback.success){
                    callback.success();
                }
            },
            finished: callback.finished,
            error: callback.error
        });
    },
    trySignInFromCookies: function ($cookies, $timeout, $scope, $http, callback) {
        var login = $cookies.login;
        var password = $cookies.password;
        if (login && password) {
            Http.signin($scope, $timeout, $http, login, password, {
                finished: callback
            });
        } else {
            callback();
        }
    },
    runRequestPeriodically: function($scope, $http, $timeout, url, params){
        var handle;

        var runTimeout = function () {
            handle = $timeout(function () {
                callback();
            }, params.interval || 2000);
        };

        var finished = params.finished;
        var onPreRequest = params.onPreRequest;

        var callback = function () {
            if(onPreRequest){
                if(!onPreRequest()){
                    return;
                }
            }

            var args = params.args;
            if(typeof args === "function"){
                args = args();
            }

            var urlValue = url;
            if(typeof urlValue == "function"){
                urlValue = url();
            }

            Utilities.get($http, urlValue, args, {
                success: params.success,
                finished: function () {
                    runTimeout();
                    if(finished){
                        finished();
                    }
                },
                error: params.error
            }, true);
        };

        runTimeout();

        $scope.$on("$destroy", function() {
            $timeout.cancel(handle);
        });
    },
    RemoteValueUpdater: function ($http, $timeout, params) {
        var valueProvider = params.valueProvider || function (data) {
                return data;
            };
        var onValueChanged = params.onValueChanged;
        var value;
        var handle;

        var runTimeout = function () {
            handle = $timeout(function () {
                callback();
            }, params.interval || 2000);
        };

        var callback = function () {
            Utilities.get($http, params.url, params.args, {
                success: function (data) {
                    var resolvedValue = valueProvider(data);
                    if (value !== resolvedValue) {
                        onValueChanged(value, resolvedValue);
                        value = resolvedValue;
                    }
                },
                finished: function () {
                    runTimeout();
                }
            }, true);
        };

        runTimeout();

        this.destroy = function () {
            $timeout.cancel(handle);
        }
    },
    initValueUpdateOnScope: function ($http, $timeout, $scope, params) {
        var updater = new this.RemoteValueUpdater($http, $timeout, params);
        $scope.$on('$destroy', function () {
            updater.destroy();
        });
    },
    unlike: function ($http, item, finished) {
        var url = "//unlike";
        var params = {
            id: item.yourLike.id
        };
        Utilities.get($http, url, params, {
            success: function (data) {
                item.yourLike = null;
                item.likesCount--;
            },
            finished: finished
        });
    },
    like: function ($http, item, params, finished) {
        var url = "//like";
        Utilities.get($http, url, params, {
            success: function (data) {
                item.yourLike = data;
                item.likesCount++;
            },
            finished: finished
        });
    },
    toggleLikeState: function ($http, item, params) {
        if(item.likeLoading){
            return;
        }

        item.likeLoading = true;
        var onFinish = function(){
            item.likeLoading = false;
        };

        if (item.yourLike) {
            this.unlike($http, item, onFinish);
        } else {
            this.like($http, item, params, onFinish);
        }
    }
};
