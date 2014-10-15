angular.module('TruckMuncherApp').controller('itemDetailsCtrl', ['$scope', '$stateParams', '$modal', '$state',
    function ($scope, $stateParams, $modal, $state) {

        $scope.categories = {"item": "test1", "item2": "test2"};

        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'itemDetailsModalCtrl'
            });

            $scope.modalInstance.result.then(function (response) {
                $scope.$emit('menuUpdated', response);
                $state.go('menu');
            }, function (response) {
                if ($state.current.name !== 'menu' && response !== 'dismissFromStateChange') {
                    $state.go('menu');
                }
            });
        };

        $scope.openModal();
    }

]);


angular.module('TruckMuncherApp').controller('itemDetailsModalCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.item = {};

        $scope.ok = function () {
            //call method to server to update item
            $modalInstance.close($scope.item);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);