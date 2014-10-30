angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService',
    function ($scope, TokenService) {
        $scope.initializeToken = function (sessionToken) {
            if(sessionToken != 'undefined')
                TokenService.setToken(sessionToken);
        };
    }
]);