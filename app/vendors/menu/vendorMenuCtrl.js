angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state', 'confirmDialogService',
    function ($scope, MenuService, TruckService, $state, confirmDialog) {
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
            var body = 'Are you sure you want to delete this item?';
            if (confirmDialog.launch(null, 'Delete Item', body, 'Yes', 'No')) {
                MenuService.deleteItem($scope.selectedTruck, itemId).then(function (response) {
                    $scope.menu = response;
                });
            }
        };

        $scope.deleteCategory = function (categoryId) {
            var body = 'Are you sure you want to delete this category? All items in the category will also be deleted.';
            if (confirmDialog.launch(null, 'Delete Category', body, 'Yes', 'No')) {
                MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function (response) {
                    $scope.menu = response;
                });
            }
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