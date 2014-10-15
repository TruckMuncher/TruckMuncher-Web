angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state',
    function ($scope, $modalInstance, $stateParams, $state) {
        $scope.item = {};

        //TODO: add tests to this. Might be difficult since it's self invoking
        (function () {
            //TODO: call api to get list of categories
            if ($state.current.name === 'menu.editItem') {
                //TODO: call api and grab item
            } else if ($stateParams.categoryId) {
                $scope.item.category = $stateParams.categoryId;
            }
        })();


        $scope.ok = function () {
            //TODO: call method to server to update item

            //TODO: return only on success and return the entire menu, which should be in the response instead of this item
            $modalInstance.close($scope.item);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);