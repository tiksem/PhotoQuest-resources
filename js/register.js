var main = angular.module("main");
main.controller("RegisterController", function($location, $timeout, $scope, $element, $http, $upload){
    $scope.onFileSelect = function($files) {
        $scope.avatar = $files[0];
    };

    $scope.register = function(){
        var data = {
            login: $scope.login,
            password: $scope.password,
            name: $scope.name,
            lastName: $scope.lastName,
            location: $scope.placeId,
            gender: $scope.gender === "male"
        };

        var url = "//register";
        Utilities.get($http, url, data, {
            success: function() {
                Http.signin($scope, $timeout, $http, $scope.login, $scope.password, function() {
                    if($scope.getSignedInUser() != null){
                        document.location.href = '#?path=first';
                    } else {
                        alert("Unknown error!");
                    }
                });
            },
            error: function(data) {
                if (data.message) {
                    alert(data.message);
                }
            }
        })

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

    Utilities.applyLinksBehavior($location, $scope, $element);
});

