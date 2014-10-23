angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state', 'MenuService',
    function ($scope, $modalInstance, $stateParams, $state, MenuService) {
        $scope.category = {};
        $scope.preventNextSubmit = false;

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams.categoryId).then(function (response) {
                    $scope.category = response;
                });
            }
        })();

        $scope.submit = function () {
            if (!$scope.preventNextSubmit) {
                $scope.preventNextSubmit = true;
                MenuService.addOrUpdateCategory(
                    $stateParams.truckId,
                    $scope.category.id,
                    $scope.category.name,
                    $scope.category.notes,
                    $scope.category.orderInMenu).then(function (response) {
                        if (response && response.hasError) {
                            alert('error');
                            $scope.preventNextSubmit = false;
                        } else {
                            $modalInstance.close(response);
                        }
                    });
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);
