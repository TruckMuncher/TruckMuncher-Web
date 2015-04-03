interface INavScope extends ng.IScope {
    loggedIn();
    isVendor();
}

angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope', 'TokenService', 'UserService',
    ($scope, $rootScope, TokenService, UserService) => new NavCtrl($scope, TokenService, UserService)]);

class NavCtrl {
    constructor(private $scope:INavScope, private TokenService:ITokenService, private UserService: IUserService) {
        $scope.loggedIn = () => {
            return !_.isNull(TokenService.getToken());
        };

        $scope.isVendor = () => {
            return false;
        }
    }

}
