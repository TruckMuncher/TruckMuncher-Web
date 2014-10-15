angular.module('TruckMuncherApp').controller('itemDetailsCtrl', ['$scope', '$stateParams', '$modal', '$state',
    function ($scope, $stateParams, $modal, $state) {

        $scope.categories = {"item": "test1", "item2": "test2"};

        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'itemDetailsModalCtrl'
            });

            $scope.modalInstance.result.then(function (response) {

            }, function (response) {
                if ($state.current.name !== 'menu' && response !== 'dismissFromStateChange') {
                    $state.go('menu');
                }
            });
        };

        $scope.openModal();
    }

]);


angular.module('TruckMuncherApp').controller('itemDetailsModalCtrl', ['$scope', '$modalInstance', '$state', '$stateParams',
    function ($scope, $modalInstance, $state, $stateParams) {
        $scope.item = {};

        $scope.ok = function () {
            //do logic here
            console.log($scope.item)
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);