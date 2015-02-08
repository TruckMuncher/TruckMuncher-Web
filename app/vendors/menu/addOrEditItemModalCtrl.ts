interface IAddOrEditItemModalScope extends ng.IScope {
    item: IMenuItem;
    requestInProgress: boolean;
    submit();
    allTags: Array<string>;
}

angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state', '$analytics',
    ($scope, MenuService, $modalInstance, $stateParams, $state, $analytics) => new AddOrEditItemModalCtrl($scope, MenuService, $modalInstance, $stateParams, $state, $analytics)]);

class AddOrEditItemModalCtrl {
    constructor(private $scope:IAddOrEditItemModalScope,
                private MenuService:IMenuService,
                private $modalInstance:ng.ui.bootstrap.IModalServiceInstance,
                private $stateParams:ng.ui.IStateParamsService,
                private $state:ng.ui.IStateService,
                private $analytics:IAngularticsService) {
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
    }
}

