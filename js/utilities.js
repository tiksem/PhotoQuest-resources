/**
 * Created by CM on 11/1/2014.
 */

Utilities = {
    ajax_request_base_url: location.origin,
    applyStylesToHtml: function(element) {
        element = element || document;
        jQuery(document).ready(function(){
            jQuery(element).find( "input[type=submit], a, button" )
                .button().click(function(){
                    jQuery(this).removeClass("ui-state-focus").removeClass("ui-state-hover").button("refresh");
                });
            jQuery(element).find(".list_item").hover(function(){
                jQuery(this).addClass("list_item_hover");
            }, function() {
                jQuery(this).removeClass("list_item_hover");
            })

            var emptyAvatar = location.origin + "/images/empty_avatar.png";
            jQuery("element").find("img.avatar").attr("src", function(i, origin) {
                if(!origin){
                    return emptyAvatar;
                }

                return origin;
            }).error(function() {
                jQuery(this).attr("href", emptyAvatar);
            });

            jQuery("element").find("form").attr("action", function(i, origin) {
                return location.origin + origin;
            })
        });
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
            object[i] = properties[i];
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
                console.log("Error " + url);
                console.log(data);
            }
        }).error(function(data){
            console.log("Error " + url);
            console.log(data);
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
    }
}