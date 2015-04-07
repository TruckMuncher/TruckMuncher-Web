interface INavScope extends ng.IScope {
    loggedIn();
    isVendor();
}

angular.module('TruckMuncherApp').controller('navCtrl', ['$scope',  'StateService',
    ($scope,  StateService) => new NavCtrl($scope, StateService)]);

class NavCtrl {
    constructor(private $scope:INavScope, private StateService:IStateService) {
        $scope.loggedIn = () => {
            return !_.isNull(StateService.getToken());
        };

        $scope.isVendor = () => {
            return StateService.isVendor();
        }
    }

}
