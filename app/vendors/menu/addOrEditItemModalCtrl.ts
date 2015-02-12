interface IAddOrEditItemModalScope extends ng.IScope {
    item: IMenuItem;
    requestInProgress: boolean;
    submit();
    allTags: Array<string>;
}

angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state', '$analytics',
    function ($scope:IAddOrEditItemModalScope,
              MenuService:IMenuService,
              $modalInstance:ng.ui.bootstrap.IModalServiceInstance,
              $stateParams:ng.ui.IStateParamsService,
              $state:ng.ui.IStateService,
              $analytics:IAngularticsService) {

        $scope.requestInProgress = false;
        $scope.item = new MenuItem();

        (() => {
            $scope.item.isAvailable = true;
            MenuService.getTags().then(function (response) {
                $scope.allTags = response.tags;
                $scope.item.tags = [];
            });

            if ($state.current.name === 'menu.editItem') {
                MenuService.getItem($stateParams['itemId']).then(function (response) {
                    $scope.item = response.menuItem;
                });
            }
        })();


        $scope.submit = () => {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                MenuService.addOrUpdateItem(
                    $scope.item,
                    $stateParams['truckId'],
                    $stateParams['categoryId']).then(function (response) {
                        $modalInstance.close(response.menu);
                    }, function () {
                        $scope.requestInProgress = false;
                    });

                $analytics.eventTrack('Submit', {category: 'EditItem'});
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);

