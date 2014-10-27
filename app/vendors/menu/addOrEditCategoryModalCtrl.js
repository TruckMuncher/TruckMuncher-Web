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
                MenuService.addOrUpdateCategory($scope.category, $stateParams.truckId).then(function (response) {
                    if (response && response.hasError) {
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
