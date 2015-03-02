var main = angular.module("main");
main.controller("RegisterController", function($location, $timeout, $scope, $element, $http, $upload){
    var tr = $scope.tr;

    $scope.onFileSelect = function($files) {
        $scope.avatar = $files[0];
    };

    var loadCaptcha = function() {
        delete $scope.captchaKey;
        Utilities.get($http, "//getCaptcha", {}, function(data) {
            $scope.captchaKey = data.id;
        });
    };
    loadCaptcha();

    $scope.getCaptchaUrl = function() {
        return window.location.origin + "//captcha/" + $scope.captchaKey;
    };

    $scope.register = function(){
        var data = {
            login: $scope.login,
            password: $scope.password,
            name: $scope.name,
            lastName: $scope.lastName,
            cityId: $scope.city,
            gender: $scope.gender === "male",
            captcha: $scope.captchaKey,
            answer: $scope.answer
        };

        if(!data.login){
            $scope.errorMessage = tr.loginFieldBlank;
            return;
        }

        if(!data.password){
            $scope.errorMessage = tr.passwordFieldBlank;
            return;
        }

        if(!data.name){
            $scope.errorMessage = tr.nameFieldBlank;
            return;
        }

        if(!data.lastName){
            $scope.errorMessage = tr.lastNameFieldBlank;
            return;
        }

        if(!data.gender) {
            $scope.errorMessage = tr.genderFieldIsBlank;
            return;
        }

        if(!$scope.country){
            $scope.errorMessage = tr.countryFieldIsBlank;
            return;
        }

        if(!data.cityId){
            $scope.errorMessage = tr.cityFieldIsBlank;
            return;
        }

        if(!data.answer){
            $scope.errorMessage = tr.captchaFieldIsBlank;
            return;
        }

        var url = "//register";
        $scope.registerLoading = true;
        Utilities.get($http, url, data, {
            success: function() {
                Http.signin($scope, $timeout, $http, $scope.login, $scope.password, {
                    error: function(data) {
                        alert(data.message)
                    },
                    success: function() {
                        document.location.href = '#?path=first';
                    }
                });
            },
            error: function(data) {
                if(data.error == "InvalidCaptchaException"){
                    $scope.errorMessage = tr.enterCorrectCode;
                } else {
                    $scope.errorMessage = tr.unknownError;
                }

                loadCaptcha();
            },
            finished: function() {
                $scope.registerLoading = false;
            }
        });

        $scope.upload = $upload.upload({
            url: url,
            method: 'POST',
            file: $scope.avatar,
            data: data
        }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            if (!data.error) {
                alert("Success!")
                console.log(data);
            } else {
                var message = data.error + " " + data.message;
                console.error(data);
                alert(message)
            }
        }).error(function(data){
            console.error(data);
        });
    };

    Utilities.applyLinksBehavior($location, $scope, $element)();
});

