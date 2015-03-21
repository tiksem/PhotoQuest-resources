/**
 * Created by CM on 11/1/2014.
 */

$.fn.getHiddenOffsetWidth = function () {
    // save a reference to a cloned element that can be measured
    var $hiddenElement = $(this).clone().appendTo($(this).
        parents(':visible').first());

    // calculate the width of the clone
    var width = $hiddenElement.outerWidth();

    // remove the clone from the DOM
    $hiddenElement.remove();

    return width;
};

Utilities = {
    ajax_request_base_url: location.origin,
    applyLinksBehavior: function ($location, $scope, element) {
        var scrollHash = this.scrollHash = this.scrollHash || {};
        element = $(element);

        var that = this;

        var scrollToZero = function () {
            window.scrollTo(0, 0);
            var absUrl = $location.absUrl();
            scrollHash[absUrl] = {
                x: 0,
                y: 0
            };
        };

        var applyScroll = this.applyScroll = this.applyScroll || function () {
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
            this.onLocationChangedDefault || function (event, next, current) {
                that.scrollAplied = false;
                applyScroll();
                that.scrollAplied = false;
                if (next == current) {
                    scrollToZero();
                }
            };
        var offDefault = this.offDefault = this.offDefault ||
        $scope.$on('$locationChangeStart', onLocationChangedDefault);

        element.find("a").add(element.find(".a")).click(function (e) {
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

        return function () {
            var url = $location.absUrl();
            var scroll = scrollHash[url];
            if (scroll) {
                window.scrollTo(scroll.x, scroll.y);
            } else {
                scrollToZero();
            }
        }
    },
    ajax: function (params) {
        var url = this.ajax_request_base_url + params.url;
        var data = params.data;
        var method = params.method;
        var onSuccess = params.success;
        var onError = params.error || function (message) {
                alert(message);
            }

        jQuery.ajax({
            url: url,
            data: data,
            method: method,
            success: function (data) {
                if (data.error) {
                    onError(data.error);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                onError(thrownError)
            }
        });
    },
    addProperties: function (object, properties) {
        for (var i in properties) {
            if (properties.hasOwnProperty(i)) {
                object[i] = properties[i];
            }
        }
    },
    loadDataToScope: function (url, params, $scope, $http, onSuccessOrParams) {
        var time = new Date().getTime();
        var onSuccess = onSuccessOrParams;
        var onError;
        if(onSuccessOrParams && typeof onSuccess !== "function"){
            onSuccess = onSuccessOrParams.success;
            onError = onSuccessOrParams.error;
        }

        var getUrlLog = function () {
            var query = Utilities.createQueryString(params);
            var urlLog = url;
            if (query != "") {
                urlLog += "?" + query + " time: " + (new Date().getTime() - time);
            }

            return urlLog;
        };

        $http.get(url, {
            params: params
        }).success(function (data) {
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
                if(onError){
                    onError(data);
                }
            }
        }).error(function (data) {
            console.log("Error " + getUrlLog());
            console.log(data);

            if(onError){
                onError();
            }
        })
    },
    getTotalCount: function (url, params, $http, onSuccess) {
        $http.get(window.location.origin + url, {
            params: params
        }).success(function (data) {
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
        }).error(function (data) {
            console.error("Error " + url);
            console.error(data);
        });
    },
    parseHashPath: function (hash) {
        return hash.split("_");
    },
    getParameterByName: function (name, url) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    parseQuery: function (qstr) {
        var query = {};
        var a = qstr.split('&');
        for (var i in a) {
            if (a.hasOwnProperty(i)) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
            }
        }

        return query;
    },
    createQueryString: function (map) {
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
    request: function (type, $http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        var time = new Date().getTime();

        var getUrlLog = function () {
            var query = Utilities.createQueryString(params);
            var urlLog = url;
            if (query != "") {
                urlLog += "?" + query + " time: " + (new Date().getTime() - time);
            }

            return urlLog;
        };

        var success = argsOrOnSuccess;
        var finished;
        var error;

        if (typeof argsOrOnSuccess !== "function") {
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
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            };

            call = func(window.location.origin + url, params, config);
        } else {
            var config = {
                params: params
            };
            call = func(window.location.origin + url, config);
        }

        call.success(function (data) {
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
                if (error) {
                    error(data);
                }
            }

            if (finished) {
                finished();
            }

        }).error(function () {
            console.error("Error " + getUrlLog());
            console.error(data);

            if (error) {
                error(data);
            }

            if (finished) {
                finished();
            }
        })
    },
    get: function ($http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        this.request("get", $http, url, params, argsOrOnSuccess, withoutSuccessLogs);
    },
    post: function ($http, url, params, argsOrOnSuccess, withoutSuccessLogs) {
        this.request("post", $http, url, params, argsOrOnSuccess, withoutSuccessLogs);
    },
    uploadPhoto: function ($scope, $upload, url, data, success, error) {
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
            } else {
                if (error) {
                    error(data);
                }
                console.error(data);
            }
        }).error(function (data) {
            console.error(data);
            if (error) {
                error();
            }
        })
    },
    addWatcher: function ($scope, valueProvider, callback) {
        return $scope.$watch(
            function ($scope) {
                return valueProvider($scope);
            },
            function (newValue, oldValue) {
                if (newValue !== undefined && oldValue !== undefined) {
                    callback(newValue, oldValue);
                }
            }
        )
    },
    addOneShotWatcher: function ($scope, valueProvider, callback) {
        var unwatch = this.addWatcher($scope, valueProvider, function() {
            callback();
            unwatch();
        });
        return unwatch;
    },
    addCounterWatcher: function ($scope, params) {
        var valueProvider = params.valueProvider;
        var onIncrease = params.onIncrease;
        var onChanged = params.onChanged;
        var onDecrease = params.onDecrease;

        $scope.$watch(
            function ($scope) {
                return valueProvider($scope);
            },
            function (newValue, oldValue) {
                if (newValue !== undefined && oldValue !== undefined) {
                    if (newValue > oldValue) {
                        if (onIncrease) {
                            onIncrease(oldValue - newValue);
                        }
                    } else {
                        if (onDecrease) {
                            onDecrease(newValue - oldValue);
                        }
                    }

                    if (onChanged) {
                        onChanged(newValue, oldValue);
                    }
                }
            }
        )
    },
    searchToUrlPart: function (search) {
        var pairs = [];
        for (var key in search) {
            if (search.hasOwnProperty(key)) {
                pairs.push(key + "=" + search[key]);
            }
        }

        if (pairs.length <= 0) {
            return "";
        }

        return "#?" + pairs.join("&");
    },
    getUrlSearchPath: function ($location) {
        var search = $location.search();
        return this.searchToUrlPart(search);
    },
    addToSearchPath: function ($location, add) {
        var search = this.getUrlSearchPath($location);
        if (search) {
            return search + "&" + add;
        }

        return "#?" + add;
    },
    getMonth: function (date, monthOfYear) {
        var months = monthOfYear;

        return months[date.getMonth()];
    },
    getDay: function (date) {
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }

        return day;
    },
    getHours: function (date) {
        var hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }

        return hours;
    },
    getMinutes: function (date) {
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes;
    },
    getMonthRaw: function (raw, monthOfYear) {
        var date = new Date(raw);
        return this.getMonth(date, monthOfYear);
    },
    getDayRaw: function (raw) {
        var date = new Date(raw);
        return this.getDay(date);
    },
    getHoursRaw: function (raw) {
        var date = new Date(raw);
        return this.getHours(date);
    },
    getMinutesRaw: function (raw) {
        var date = new Date(raw);
        return this.getMinutes(date);
    },
    getHoursAndMinutesRaw: function (raw) {
        var date = new Date(raw);
        return this.getHours(date) + ":" + this.getMinutes(date);
    },
    getDisplayDate: function (rawValue, monthOfYear, at) {
        var date = new Date(rawValue);

        var month = this.getMonth(date, monthOfYear);
        var year = date.getFullYear();

        var day = this.getDay(date);

        var hours = this.getHours(date);

        var minutes = this.getMinutes(date);

        return day + " " + month + " " + year + " " + at + " " + hours + ":" + minutes;
    },
    deleteUndefinedValues: function (arr) {
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                if (i === undefined || i === null || i === "undefined") {
                    delete arr[i];
                }
            }
        }
    },
    interval: function ($scope, $interval, callback, delay) {
        var handle = $interval(function () {
            callback();
        }, delay);

        $scope.$on('$destroy', function () {
            $interval.cancel(handle);
        });
    },
    checkPassword: function (password) {
        return XRegExp(".{6,20}").test(password);
    },
    mobilecheck: function () {
        var check = false;
        (function (a, b) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    isAndroid: function() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }
};