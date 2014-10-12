angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'FullMenus', '$state',
    function ($scope, FullMenus, $state) {
        $scope.menu = {"truckId":1234,"menuId":1234,"category":[{"id":1234,"name":"Sandwiches","notes":"Free drink with all sandwiches","orderInMenu":0,"menuItem":[{"id":1234,"name":"Roast Beef","price":5.75,"notes":"Roast beef, lettuce, and tomato","tag":["tag1","tag2"],"orderInCategory":0,"isAvailable":true,"unknownFieldsSerializedSize":0,"serializedSize":69}],"unknownFieldsSerializedSize":0,"serializedSize":120}],"unknownFieldsSerializedSize":0,"serializedSize":128};

        FullMenus.get(15, 15, true).then(function (response) {

        });

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
        });

        $scope.editItem = function(itemId){
            $state.go('.editItem', {itemId: itemId});
        };

        $scope.addItem = function() {
            $state.go('.addItem');
        }

    }
]);