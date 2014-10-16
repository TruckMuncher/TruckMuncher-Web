angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state',
    function ($scope, $modalInstance, $stateParams, $state) {
        $scope.item = {};
        $scope.somethingelse = {};

        //TODO: add tests to this. Might be difficult since it's self invoking
        (function () {
            //TODO: call api to get list of categories
            if ($state.current.name === 'menu.editItem') {
                //TODO: call api and grab item
                //MenuService.getItem($stateParams.itemid).then(function(response){$scope.item=response}, function(error){console.log(error)});
            } else if ($stateParams.categoryId) {
                $scope.item.category = $stateParams.categoryId;
            }
        })();


        $scope.ok = function () {
            //TODO: call method to server to update item
            //MenuService.updateItem($scope.item).then(function(response){ $modalInstance.close(response)});
            //TODO: return only on success and return the entire menu, which should be in the response instead of this item
            console.log(somethingelse);
            $modalInstance.close($scope.item);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);