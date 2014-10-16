angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state', 'MenuService',
    function ($scope, $modalInstance, $stateParams, $state, MenuService) {
        $scope.category = {};

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams.categoryId).then(function (response) {
                    $scope.category = response;
                });
            }
        })();

        $scope.ok = function () {
            MenuService.addOrUpdateCategory(
                $stateParams.truckId,
                $scope.category.id,
                $scope.category.name,
                $scope.category.notes,
                $scope.category.orderInMenu).then(function (response) {
                    $modalInstance.close(response);
                }, function (error) {
                    alert(error);
                });
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);
