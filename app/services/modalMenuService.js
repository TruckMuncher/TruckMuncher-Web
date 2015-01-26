angular.module('TruckMuncherApp').factory('ModalMenuService', ['$modal', function ($modal) {
    return {
        launch: function (truckId, customMenuColors) {
            var modalCtrl = ['$scope', 'truckId', 'customMenuColors', '$modalInstance', 'MenuService', function ($scope, truckId, customMenuColors, $modalInstance, MenuService) {
                $scope.menu = null;
                $scope.customMenuColors = customMenuColors;

                MenuService.getMenu(truckId).then(function (response) {
                    $scope.menu = response;
                });

                $scope.close = function () {
                    $modalInstance.close({});
                };
            }];

            $modal.open({
                templateUrl: "/partials/map/customer-menu.jade",
                controller: modalCtrl,
                resolve: {
                    truckId: function () {
                        return truckId;
                    },
                    customMenuColors: function () {
                        return customMenuColors;
                    }
                }
            });
        }
    };
}]);