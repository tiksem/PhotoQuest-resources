/**
 * Created by CM on 11/1/2014.
 */

Utilities = {
    ajax_request_base_url: location.origin,
    applyStylesToHtml: function(element) {

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
        $http.get(url, {
            params: params
        }).success(function(data){
            if (!data.error) {
                Utilities.addProperties($scope, data);
                if (onSuccess) {
                    onSuccess(data);
                }
                console.log("Success " + url);
                console.log(data);
            } else {
                console.log("Error " + url);
                console.log(data);
            }
        }).error(function(data){
            console.log("Error " + url);
            console.log(data);
        })
    },
    getTotalCount: function(url, params, $http, onSuccess) {
        $http.get(url, {
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
                strs.push(encodeURIComponent(i) + "=" + encodeURIComponent(map[i]));
            }
        }

        return strs.join("&");
    },
    get: function($http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        var success = argsOrOnSuccess;
        var finished;
        var error;

        if(typeof argsOrOnSuccess !== "function"){
            success = argsOrOnSuccess.success;
            finished = argsOrOnSuccess.finished;
            error = argsOrOnSuccess.error;
        }

        $http.get(window.location.origin + url, {
            params: params
        }).success(function(data) {
            if (!data.error) {
                success(data);
                if (!withoutSuccessLogs) {
                    console.log("Success " + url);
                    console.log(data);
                }
            } else {
                console.error("Error " + url);
                console.error(data);
                if(error){
                    error(data);
                }
            }

            if(finished){
                finished();
            }

        }).error(function(){
            console.error("Error " + url);
            console.error(data);

            if(error){
                error(data);
            }

            if(finished){
                finished();
            }
        })
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
    getDisplayDate: function(rawValue) {
        var date = new Date(rawValue);
        return date.toDateString() + " " + date.toTimeString().replace(/ GMT.+$/, "");
    },
    deleteUndefinedValues: function(arr) {
        for(var i in arr){
            if(i === undefined || i === null){
                delete arr[i];
            }
        }
    }
}