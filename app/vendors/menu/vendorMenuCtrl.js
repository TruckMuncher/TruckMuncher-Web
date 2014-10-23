angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state',
    function ($scope, MenuService, TruckService, $state) {
        $scope.selectedTruck = null;
        $scope.menu = {};

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0].id;
            }
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck && $scope.menu.truckId !== $scope.selectedTruck) {
                MenuService.getMenu($scope.selectedTruck).then(function (response) {
                    $scope.menu = response;
                });
            }
        });

        $scope.deleteItem = function (itemId) {
            MenuService.deleteItem($scope.selectedTruck, itemId).then(function (response) {
                $scope.menu = response;
            });
        };

        $scope.deleteCategory = function (categoryId) {
            MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function (response) {
                $scope.menu = response;
            });
        };

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
            $scope.selectedTruck = $scope.menu.truckId;
        });

        $scope.addItem = function (truckId, categoryId) {
            $state.go('.addItem', {truckId: truckId, categoryId: categoryId});
        };

    }
]);