angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService',
    function ($scope, TokenService) {
        $scope.initializeToken = function (sessionToken) {
                TokenService.setToken(sessionToken);
        };
    }
]);