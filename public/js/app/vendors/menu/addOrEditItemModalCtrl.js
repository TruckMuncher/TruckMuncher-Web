angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state',
    function ($scope, $modalInstance, $stateParams, $state) {
        $scope.item = {};

        (function () {
            //call api to get list of categories
            if ($state.current.name === 'editItem') {
                //call api and grab item
            } else if ($stateParams.categoryId) {
                $scope.item.category = $stateParams.categoryId;
            }
        })();


        $scope.ok = function () {
            //call method to server to update item
            $modalInstance.close($scope.item);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);