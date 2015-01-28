/* @flow */
angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state', 'MenuService', '$analytics',
    function ($scope, $modalInstance, $stateParams, $state, MenuService:IMenuService, $analytics) {
        $scope.category = {};
        $scope.requestInProgress = false;

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams.categoryId).then(function (response: ICategory) {
                    $scope.category = response;
                });
            }
        })();

        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                var categoryClone: ICategory = _.clone($scope.category);
                delete categoryClone.menuItems;

                MenuService.addOrUpdateCategory(categoryClone, $stateParams.truckId).then(function (response: IMenu) {
                    $modalInstance.close(response);
                }, function () {
                    $scope.requestInProgress = false;
                });

                $analytics.eventTrack('Submit', {category: 'EditCategory'});
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);
