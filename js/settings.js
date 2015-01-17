var main = angular.module("main");
main.controller("SettingsController", function($rootScope, $scope, ngDialog, $element, $http, $location){
    $scope.name = $scope.getSignedInUser().name;
    $scope.lastName = $scope.getSignedInUser().lastName;
    $scope.city = $scope.getSignedInUser().city;
    $scope.country = $scope.getSignedInUser().country;

    $scope.saveProfile = function() {
        Utilities.get($http, "//editProfile", {
            name: $scope.name,
            lastName: $scope.lastName,
            location: $scope.placeId
        }, function(data) {
            $scope.setSignedInUser(data);
            alert("Success!");
        });
    };
    $scope.changePassword = function() {
        if($scope.retypedPassword !== $scope.newPassword){
            $scope.changePasswordError = "Passwords do not match";
            return;
        }

        Utilities.post($http, "//changePassword", {
            old: $scope.oldPassword,
            new: $scope.newPassword
        },{
            success: function() {
                alert("Success!");
            },
            error: function(data) {
                if(data && data.error){
                    $scope.changePasswordError = data.error.message;
                } else {
                    $scope.changePasswordError = "Unknown error!";
                }
            }
        });
    };
    Utilities.applyLinksBehavior($location, $scope, $element)();
});
