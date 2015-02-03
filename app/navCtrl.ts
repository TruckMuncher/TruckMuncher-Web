angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope', 'TokenService',
    function ($scope, $rootScope, TokenService) {
        $scope.loggedIn = function () {
            return !_.isNull(TokenService.getToken());
        };
    }]);
