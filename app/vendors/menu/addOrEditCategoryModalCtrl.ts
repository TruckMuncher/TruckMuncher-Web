
interface IAddOrEditCategoryModalScope extends ng.IScope {
    category: ICategory;
    requestInProgress: boolean;
    submit();
}

angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state', '$analytics',
    ($scope, MenuService, $modalInstance, $stateParams, $state, $analytics) => new AddOrEditCategoryModalCtrl($scope, MenuService, $modalInstance, $stateParams, $state, $analytics)]);


class AddOrEditCategoryModalCtrl {
    constructor(private $scope:IAddOrEditCategoryModalScope,
                private MenuService:IMenuService,
                private $modalInstance:ng.ui.bootstrap.IModalServiceInstance,
                private $stateParams:ng.ui.IStateParamsService,
                private $state:ng.ui.IStateService,
                private $analytics:IAngularticsService) {
        $scope.requestInProgress = false;
        $scope.category = new Category();

        (() => {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams['categoryId']).then(function (response) {
                    $scope.category = response.category;
                });
            }
        })();

        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                var categoryClone = _.clone($scope.category);
                delete categoryClone.menuItems;

                MenuService.addOrUpdateCategory(categoryClone, $stateParams['truckId']).then(function (response) {
                    $modalInstance.close(response.menu);
                }, function () {
                    $scope.requestInProgress = false;
                });

                $analytics.eventTrack('Submit', {category: 'EditCategory'});
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }
}
