/* @flow */
angular.module('TruckMuncherApp').controller('menuActionModalCtrl', ['$scope', '$stateParams', '$modal', '$state',
    function ($scope, $stateParams, $modal, $state) {

        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: $state.current.data.templateUrl,
                controller: $state.current.data.controller
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
