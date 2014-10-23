angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state', 'MenuService',
    function ($scope, $modalInstance, $stateParams, $state, MenuService) {
        $scope.category = {};
        $scope.requestInProgress = false;

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams.categoryId).then(function (response) {
                    $scope.category = response;
                });
            }
        })();

        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                MenuService.addOrUpdateCategory(
                    $stateParams.truckId,
                    $scope.category.id,
                    $scope.category.name,
                    $scope.category.notes,
                    $scope.category.orderInMenu).then(function (response) {
                        if (response && response.hasError) {
                            alert('error');
                            $scope.requestInProgress = false;
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
