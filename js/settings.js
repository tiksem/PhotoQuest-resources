var main = angular.module("main");
main.controller("SettingsController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    $scope.name = $scope.getSignedInUser().name;
    $scope.lastName = $scope.getSignedInUser().lastName;
    $scope.cityName = $scope.getSignedInUser().city;
    $scope.countryName = $scope.getSignedInUser().country;
    $scope.city = $scope.getSignedInUser().cityId;
    $scope.country = $scope.getSignedInUser().cityId;

    $scope.errorType = "";

    var errorMessage;

    var errorMessages = {
        "country": "Enter your country!",
        "city": "Enter your city!"
    };

    $scope.getErrorMessage = function() {
        if ($scope.errorType != "message") {
            return errorMessages[$scope.errorType];
        } else {
            return errorMessage;
        }
    };

    Utilities.addWatcher($scope, function() {
        return $scope.country || $scope.city;
    }, function(value) {
        if($scope.country && $scope.errorType == "country"){
            $scope.errorType = "";
        }

        if($scope.city){
            $scope.errorType = "";
        }
    });

    $scope.saveProfile = function() {
        if(!$scope.country){
            $scope.errorType = "country";
            return;
        } else if(!$scope.city) {
            $scope.errorType = "city";
            return;
        }

        $scope.changeLoading = true;
        Utilities.get($http, "//editProfile", {
            name: $scope.name,
            lastName: $scope.lastName,
            cityId: $scope.city
        }, {
            success: function(data) {
                $scope.setSignedInUser(data);
                $scope.errorType = "";
                errorMessage = "";
            },
            error: function(data) {
                $scope.errorType = "message";
                errorMessage = data.message;
            },
            finished: function() {
                $scope.changeLoading = false;
            }
        });
    };
    $scope.changePassword = function() {
        if($scope.retypedPassword !== $scope.newPassword){
            $scope.changePasswordError = "Passwords do not match";
            return;
        }

        $scope.changePasswordLoading = true;
        Utilities.post($http, "//changePassword", {
            old: $scope.oldPassword,
            new: $scope.newPassword
        },{
            finished: function() {
                $scope.changePasswordLoading = false;
            },
            error: function(data) {
                if(data && data.error){
                    $scope.changePasswordError = data.message;
                } else {
                    $scope.changePasswordError = "Unknown error!";
                }
            },
            success: function(data) {
                $scope.setSignedInUser(data);
                $scope.changePasswordError = "";
                $scope.oldPassword = "";
                $scope.newPassword = "";
                $scope.retypedPassword = "";
                alert("Password was changed!")
            }
        });
    };
    Utilities.applyLinksBehavior($location, $scope, $element)();
});
