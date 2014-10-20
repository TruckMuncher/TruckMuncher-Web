angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state',
    function ($scope, MenuService, $modalInstance, $stateParams, $state) {
        $scope.item = {};

        (function () {
            if ($state.current.name === 'menu.editItem') {
                MenuService.getItem($stateParams.itemId).then(function (response) {
                    $scope.item = response
                });
            }
        })();


        $scope.ok = function () {
            MenuService.addOrUpdateItem($scope.item, $stateParams.truckId, $stateParams.categoryId)
                .then(
                function (response) {
                    $modalInstance.close(response)
                });
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);