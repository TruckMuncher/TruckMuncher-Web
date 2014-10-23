angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state',
    function ($scope, MenuService, $modalInstance, $stateParams, $state) {
        $scope.item = {};
        $scope.preventNextSubmit = false;

        (function () {
            if ($state.current.name === 'menu.editItem') {
                MenuService.getItem($stateParams.itemId).then(function (response) {
                    $scope.item = response;
                });
            }
        })();


        $scope.submit = function () {
            if (!$scope.preventNextSubmit) {
                $scope.preventNextSubmit = true;
                MenuService.addOrUpdateItem(
                    $scope.item,
                    $stateParams.truckId,
                    $stateParams.categoryId).then(function (response) {
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