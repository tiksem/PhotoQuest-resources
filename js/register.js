var main = angular.module("main");
main.controller("RegisterController", function($scope, $element, $http, $upload){
    $scope.onFileSelect = function($files) {
        $scope.avatar = $files[0];
    };

    var register_location_input = $($element).find("#register_location_input")
    register_location_input.autocomplete({
        serviceUrl: '/getLocationSuggestions',
        onSelect: function(suggestion) {
            $scope.$apply(function(){
                $scope.country = suggestion.country;
                $scope.city = suggestion.city;
                $scope.placeId = suggestion.placeId;
            });
            register_location_input.val("");
        }
    });

    $scope.register = function(){
        var data = {
            login: $scope.login,
            password: $scope.password,
            name: $scope.name,
            lastName: $scope.lastName,
            location: $scope.placeId
        };

        var url = window.location.origin + "//register";
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

    Utilities.applyStylesToHtml($element);
});

