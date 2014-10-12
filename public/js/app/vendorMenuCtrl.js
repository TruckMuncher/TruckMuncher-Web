angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state',
    function ($scope, MenuService, TruckService, $state) {
        $scope.trucks = [
            {'truckId': 1234, 'name': 'South Side Truck'},
            {'truckId': 1235, 'name': 'East Side Truck'}
        ];
        $scope.selectedTruck=1234;

        $scope.menu = {"truckId": 1234, "menuId": 1234, "category": [
            {"id": 1234, "name": "Sandwiches", "notes": "Free drink with all sandwiches", "orderInMenu": 0, "menuItem": [
                {"id": 1234, "name": "Roast Beef", "price": 5.75, "notes": "Roast beef, lettuce, and tomato", "tag": ["tag1", "tag2"], "orderInCategory": 0, "isAvailable": true, "unknownFieldsSerializedSize": 0, "serializedSize": 69}
            ], "unknownFieldsSerializedSize": 0, "serializedSize": 120},
            {"id": 1235, "name": "Salads", "notes": "Free drink with all salads", "orderInMenu": 1, "menuItem": [
                {"id": 1234, "name": "Worst Salad NA", "price": 1000.75, "notes": "Iceburg lettuce. Eat up!", "tag": ["tag1", "tag2"], "orderInCategory": 0, "isAvailable": true, "unknownFieldsSerializedSize": 0, "serializedSize": 69}
            ], "unknownFieldsSerializedSize": 0, "serializedSize": 120}
        ], "unknownFieldsSerializedSize": 0, "serializedSize": 128};

        TruckService.getTrucksForVendor().then(function (response) {
//            $scope.trucks = response;
        });

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
        });

        $scope.editItem = function (itemId) {
            $state.go('.editItem', {itemId: itemId});
        };

        $scope.addItem = function () {
            $state.go('.addItem');
        };

    }
]);