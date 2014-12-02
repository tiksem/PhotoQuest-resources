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
    setQueryParam: function($location, key, value) {
        var hash = $location.hash();
        var map = this.parseQuery(hash);
        map[key] = value;
        hash = this.createQueryString(map);
        $location.hash(hash);
    },
    getQueryParam: function($location, key) {
        return Utilities.parseQuery($location.hash())[key];
    },
    get: function($http, url, params, argsOrOnSuccess) {
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
                console.log("Success " + url);
                console.log(data);
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
    }

}