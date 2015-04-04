interface INavScope extends ng.IScope {
    loggedIn();
    isVendor();
}

angular.module('TruckMuncherApp').controller('navCtrl', ['$scope',  'StateService',
    ($scope,  StateService) => new NavCtrl($scope, StateService)]);

class NavCtrl {
    constructor(private $scope:INavScope, private TokenService:IStateService) {
        $scope.loggedIn = () => {
            return !_.isNull(TokenService.getToken());
        };

        $scope.isVendor = () => {
            return false;
        }
    }

}
