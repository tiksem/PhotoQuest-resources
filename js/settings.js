var main = angular.module("main");
main.controller("SettingsController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    var signedInUser = $scope.getSignedInUser();
    $scope.name = signedInUser.name;
    $scope.lastName = signedInUser.lastName;
    $scope.cityName = signedInUser.city;
    $scope.countryName = signedInUser.country;
    $scope.city = signedInUser.cityId;
    $scope.country = signedInUser.cityId;
    $scope.about = signedInUser.about;
    var tr = $scope.tr;

    $scope.errorType = "";

    var errorMessage;

    var errorMessages = {
        "country": tr.enterYourCountry,
        "city": tr.enterYourCity
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
            about: $scope.about,
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
            $scope.changePasswordError = tr.passwordsDoNotMatch;
            return;
        }

        if(!Utilities.checkPassword($scope.newPassword)){
            $scope.changePasswordError = tr.invalidPasswordPattern;
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
                if(data){
                    if(data.error == "PermissionDeniedException"){
                        $scope.changePasswordError = tr.invalidPassword;
                        return;
                    }
                }
            },
            success: function(data) {
                $scope.setSignedInUser(data);
                $scope.changePasswordError = "";
                $scope.oldPassword = "";
                $scope.newPassword = "";
                $scope.retypedPassword = "";
                alert(tr.passwordWasChanged)
            }
        });
    };
    Utilities.applyLinksBehavior($location, $scope, $element)();
});
