angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope', 'TokenService',
    function ($scope, $rootScope, TokenService) {
        $scope.menuItemClicked = function () {
            $rootScope.$emit('menuItemClicked');
        };

        $scope.loggedIn = function () {
            return !_.isNull(TokenService.getToken());
        };
    }]);
