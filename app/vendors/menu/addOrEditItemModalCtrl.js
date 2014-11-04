angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state', 'growl',
    function ($scope, MenuService, $modalInstance, $stateParams, $state, growl) {
        $scope.item = {};
        $scope.requestInProgress = false;

        (function () {
            if ($state.current.name === 'menu.editItem') {
                MenuService.getItem($stateParams.itemId).then(function (response) {
                    $scope.item = response;
                });
            }
        })();


        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                MenuService.addOrUpdateItem(
                    $scope.item,
                    $stateParams.truckId,
                    $stateParams.categoryId).then(function (response) {
                        $modalInstance.close(response);
                    }, function () {
                        $scope.requestInProgress = false;
                    });
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);