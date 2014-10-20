angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state',
    function ($scope, MenuService, $modalInstance, $stateParams, $state) {
        $scope.item = {};

        //TODO: add tests to this. Might be difficult since it's self invoking
        (function () {
            //TODO: call api to get list of categories
            if ($state.current.name === 'menu.editItem') {
                //TODO: call api and grab item
                MenuService.getItem($stateParams.itemId).then(function(response){$scope.item=response});
//            } else if ($stateParams.categoryId) {
//                $scope.item.category = $stateParams.categoryId;
            }
        })();


        $scope.ok = function () {
            //TODO: call method to server to update item
            MenuService.updateItem($scope.item, $stateParams.truckId, $stateParams.categoryId)
                .then(
                    function(response){
                        $modalInstance.close(response)
                    });
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);