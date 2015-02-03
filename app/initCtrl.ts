interface IInitScope extends ng.IScope {
    initializeToken(sessionToken:string);
    initializeApiUrl(url:string);
}

angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService', 'httpHelperService',
    ($scope, TokenService, httpHelperService) => new InitCtrl($scope, TokenService, httpHelperService)]);

class InitCtrl {
    constructor(private $scope:IInitScope, private TokenService:ITokenService, private httpHelperService:IHttpHelperService) {
        $scope.initializeToken = (sessionToken) => {
            if (sessionToken !== 'undefined' && sessionToken !== 'null') {
                TokenService.setToken(sessionToken);
            } else {
                TokenService.setToken(null);
            }
        };

        $scope.initializeApiUrl = (url) => {
            httpHelperService.setApiUrl(url);
        };
    }
}
