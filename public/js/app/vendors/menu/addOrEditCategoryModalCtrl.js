angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state',
    function ($scope, $modalInstance, $stateParams, $state) {
        $scope.category = {};

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                //TODO: call api and grab category
            } else if ($stateParams.menuId) {
                $scope.category.menuId = $stateParams.menuId;
            }
        })();

        $scope.ok = function () {
            //TODO: call method to server to update item

            //TODO: return only on success and return the entire menu, which should be in the response instead of this category
            $modalInstance.close($scope.category);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);
