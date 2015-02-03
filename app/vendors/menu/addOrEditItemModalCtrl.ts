angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state', '$analytics',
    function ($scope, MenuService, $modalInstance, $stateParams, $state, $analytics) {
        $scope.item = {};
        $scope.requestInProgress = false;

        (function () {
            $scope.item.isAvailable = true;
            MenuService.getTags().then(function (response) {
                $scope.allTags = response;
                $scope.item.tags = [];
            });

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

                $analytics.eventTrack('Submit', {  category: 'EditItem' });
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);