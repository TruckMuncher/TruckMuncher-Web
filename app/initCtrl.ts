angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService', 'httpHelperService',
    function ($scope, TokenService, httpHelperService) {
        $scope.initializeToken = function (sessionToken) {
            if (sessionToken !== 'undefined' && sessionToken !== 'null') {
                TokenService.setToken(sessionToken);
            } else {
                TokenService.setToken(null);
            }
        };

        $scope.initializeApiUrl = function (url) {
            httpHelperService.setApiUrl(url);
        };
    }
]);