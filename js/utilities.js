/**
 * Created by CM on 11/1/2014.
 */

Utilities = {
    ajax_request_base_url: location.origin,
    applyLinksBehavior: function($location, $scope, element) {
        var scrollHash = this.scrollHash = this.scrollHash || {};

        var that = this;

        var scrollToZero = function() {
            window.scrollTo(0, 0);
            var absUrl = $location.absUrl();
            scrollHash[absUrl] = {
                x: 0,
                y: 0
            };
        };

        var applyScroll = this.applyScroll = this.applyScroll || function() {
            if (!that.fromLink) {
                var url = $location.absUrl();
                var scroll = scrollHash[url];
                if (scroll) {
                    window.scrollTo(scroll.x, scroll.y);
                } else {
                    scrollToZero();
                }
            } else {
                scrollToZero();
            }

            that.fromLink = false;
        };

        this.fromLink = this.fromLink || false;
        var onLocationChangedDefault = this.onLocationChangedDefault =
            this.onLocationChangedDefault || function(event, next, current) {
                that.scrollAplied = false;
                applyScroll();
                that.scrollAplied = false;
                if (next == current) {
                    scrollToZero();
                }
        };
        var offDefault = this.offDefault = this.offDefault ||
        $scope.$on('$locationChangeStart', onLocationChangedDefault);

        $(element).find("a").click(function(e){
            var absUrl = $location.absUrl();
            if (this.href != absUrl) {
                that.fromLink = true;
                scrollHash[absUrl] = {
                    x: window.scrollX,
                    y: window.scrollY
                };
            } else {
                window.scrollTo(0, 0);
            }
        });

        return function() {
            var url = $location.absUrl();
            var scroll = scrollHash[url];
            if (scroll) {
                window.scrollTo(scroll.x, scroll.y);
            } else {
                scrollToZero();
            }
        }
    },
    ajax: function(params){
        var url = this.ajax_request_base_url + params.url;
        var data = params.data;
        var method = params.method;
        var onSuccess = params.success;
        var onError = params.error || function(message) {
            alert(message);
        }

        jQuery.ajax({
            url: url,
            data: data,
            method: method,
            success: function(data){
                if(data.error){
                    onError(data.error);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                onError(thrownError)
            }
        });
    },
    addProperties: function(object, properties) {
        for(var i in properties){
            if (properties.hasOwnProperty(i)) {
                object[i] = properties[i];
            }
        }
    },
    loadDataToScope: function(url, params, $scope, $http, onSuccess) {
        var time = new Date().getTime();

        var getUrlLog = function() {
            var query = Utilities.createQueryString(params);
            var urlLog = url;
            if(query != ""){
                urlLog += "?" + query + " time: " + (new Date().getTime() - time);
            }

            return urlLog;
        };

        $http.get(url, {
            params: params
        }).success(function(data){
            if (!data.error) {
                Utilities.addProperties($scope, data);
                if (onSuccess) {
                    onSuccess(data);
                }
                console.log("Success " + getUrlLog());
                console.log(data);
            } else {
                console.log("Error " + getUrlLog());
                console.log(data);
            }
        }).error(function(data){
            console.log("Error " + getUrlLog());
            console.log(data);
        })
    },
    getTotalCount: function(url, params, $http, onSuccess) {
        $http.get(window.location.origin + url, {
            params: params
        }).success(function(data){
            if (!data.error) {
                if (onSuccess) {
                    onSuccess(data.count);
                }
                console.log("Success " + url);
                console.log(data);
            } else {
                console.error("Error " + url);
                console.error(data);
            }
        }).error(function(data){
            console.error("Error " + url);
            console.error(data);
        });
    },
    parseHashPath: function(hash) {
        return hash.split("_");
    },
    parseQuery: function(qstr)
    {
        var query = {};
        var a = qstr.split('&');
        for (var i in a)
        {
            if (a.hasOwnProperty(i)) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
            }
        }

        return query;
    },
    createQueryString: function(map) {
        var strs = [];
        for (var i in map) {
            if (map.hasOwnProperty(i)) {
                if (map[i] !== undefined) {
                    strs.push(encodeURIComponent(i) + "=" + encodeURIComponent(map[i]));
                }
            }
        }

        return strs.join("&");
    },
    request: function(type, $http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        var time = new Date().getTime();

        var getUrlLog = function() {
            var query = Utilities.createQueryString(params);
            var urlLog = url;
            if(query != ""){
                urlLog += "?" + query + " time: " + (new Date().getTime() - time);
            }

            return urlLog;
        };

        var success = argsOrOnSuccess;
        var finished;
        var error;

        if(typeof argsOrOnSuccess !== "function"){
            success = argsOrOnSuccess.success;
            finished = argsOrOnSuccess.finished;
            error = argsOrOnSuccess.error;
        }

        var func = $http[type];

        var call;
        if (type === "post") {
            var transform = function (data) {
                return $.param(data);
            };

            var config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            };

            call = func(window.location.origin + url, params, config);
        } else {
            var config = {
                params: params
            };
            call = func(window.location.origin + url, config);
        }

        call.success(function(data) {
            if (!data.error) {
                if (success) {
                    success(data);
                }
                if (!withoutSuccessLogs) {
                    console.log("Success " + getUrlLog());
                    console.log(data);
                }
            } else {
                console.error("Error " + getUrlLog());
                console.error(data);
                if(error){
                    error(data);
                }
            }

            if(finished){
                finished();
            }

        }).error(function(){
            console.error("Error " + getUrlLog());
            console.error(data);

            if(error){
                error(data);
            }

            if(finished){
                finished();
            }
        })
    },
    get: function($http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        this.request("get", $http, url, params, argsOrOnSuccess, withoutSuccessLogs);
    },
    post: function($http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        this.request("post", $http, url, params, argsOrOnSuccess, withoutSuccessLogs);
    },
    uploadPhoto: function($scope, $upload, url, data, success, error) {
        $scope.upload = $upload.upload({
            url: window.location.origin + url,
            method: 'POST',
            data: data,
            file: $scope.file
        }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            if (!data.error) {
                if (success) {
                    success(data);
                }
                alert("Success");
            } else {
                if(error){
                    error(data);
                }
                console.error(data);
            }
        }).error(function(data){
            console.error(data);
            if(error){
                error();
            }
        })
    },
    addWatcher: function($scope, valueProvider, callback) {
        $scope.$watch(
            function($scope){
                return valueProvider($scope);
            },
            function(newValue, oldValue) {
                if(newValue !== undefined && oldValue !== undefined){
                    callback(newValue, oldValue);
                }
            }
        )
    },
    addCounterWatcher: function($scope, params) {
        var valueProvider = params.valueProvider;
        var onIncrease = params.onIncrease;
        var onChanged = params.onChanged;
        var onDecrease = params.onDecrease;

        $scope.$watch(
            function($scope){
                return valueProvider($scope);
            },
            function(newValue, oldValue) {
                if(newValue !== undefined && oldValue !== undefined){
                    if(newValue > oldValue){
                        if (onIncrease) {
                            onIncrease(oldValue - newValue);
                        }
                    } else {
                        if (onDecrease) {
                            onDecrease(newValue - oldValue);
                        }
                    }

                    if(onChanged){
                        onChanged(newValue, oldValue);
                    }
                }
            }
        )
    },
    searchToUrlPart: function(search) {
        var pairs = [];
        for(var key in search){
            if(search.hasOwnProperty(key)){
                pairs.push(key + "=" + search[key]);
            }
        }

        if(pairs.length <= 0){
            return "";
        }

        return "#?" + pairs.join("&");
    },

    getUrlSearchPath: function($location) {
        var search = $location.search();
        return this.searchToUrlPart(search);
    },
    addToSearchPath: function($location, add) {
        var search = this.getUrlSearchPath($location);
        if(search){
            return search + "&" + add;
        }

        return "#?" + add;
    },
    getMonth: function(date) {
        var months = this.names = this.names || ["Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"];

        return months[date.getMonth()];
    },
    getDay: function(date) {
        var day = date.getDay();
        if(day < 10){
            day = "0" + day;
        }

        return day;
    },
    getHours: function(date) {
        var hours = date.getHours();
        if(hours < 10){
            hours = "0" + hours;
        }

        return hours;
    },
    getMinutes: function(date) {
        var minutes = date.getMinutes();
        if(minutes < 10){
            minutes = "0" + minutes;
        }

        return minutes;
    },
    getMonthRaw: function(raw) {
        var date = new Date(raw);
        return this.getMonth(date);
    },
    getDayRaw: function(raw) {
        var date = new Date(raw);
        return this.getDay(date);
    },
    getHoursRaw: function(raw) {
        var date = new Date(raw);
        return this.getHours(date);
    },
    getMinutesRaw: function(raw) {
        var date = new Date(raw);
        return this.getMinutes(date);
    },
    getHoursAndMinutesRaw: function(raw) {
        var date = new Date(raw);
        return this.getHours(date) + ":" + this.getMinutes(date);
    },
    getDisplayDate: function(rawValue) {
        var date = new Date(rawValue);

        var month = this.getMonth(date);
        var year = date.getFullYear();

        var day = this.getDay(date);

        var hours = this.getHours(date);

        var minutes = this.getMinutes(date);

        var at = " at ";

        return day + " " + month + " " + year + at + hours + ":" + minutes;
    },
    deleteUndefinedValues: function(arr) {
        for(var i in arr){
            if (arr.hasOwnProperty(i)) {
                if (i === undefined || i === null || i === "undefined") {
                    delete arr[i];
                }
            }
        }
    },
    interval: function($scope, $interval, callback, delay) {
        var handle = $interval(function(){
            callback();
        }, delay);

        $scope.$on('$destroy', function() {
            $interval.cancel(handle);
        });
    }
}