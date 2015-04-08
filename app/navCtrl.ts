interface INavScope extends ng.IScope {
    loggedIn();
    isVendor();
    navbarCollapsed: boolean;
}

angular.module('TruckMuncherApp').controller('navCtrl', ['$scope',  'StateService', '$rootScope',
    ($scope,  StateService, $rootScope) => new NavCtrl($scope, StateService, $rootScope)]);

class NavCtrl {
    constructor(private $scope:INavScope, private StateService:IStateService, private $rootScope: ng.IRootScopeService) {
        $scope.navbarCollapsed = true;

        $scope.loggedIn = () => {
            return !_.isNull(StateService.getToken());
        };

        $scope.isVendor = () => {
            return StateService.isVendor();
        };

        $rootScope.$on("$stateChangeStart",function(){
            $scope.navbarCollapsed = true;
        });


    }

}
