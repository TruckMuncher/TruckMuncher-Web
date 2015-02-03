interface INavScope extends ng.IScope {
    loggedIn();
}

angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope', 'TokenService',
    ($scope, $rootScope, TokenService) => new NavCtrl($scope, TokenService)]);

class NavCtrl {
    constructor(private $scope:INavScope, private TokenService:ITokenService) {
        $scope.loggedIn = () => {
            return !_.isNull(TokenService.getToken());
        };
    }
}
