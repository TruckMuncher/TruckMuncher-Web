angular.module('vendorApp')
    .controller('itemDetailsCtrl', ['$scope', function ($scope) {
        $scope.categories = {"item": "test1", "item2": "test2"};

        $scope.submitNewItem = function () {

            var json = {"name": $('#itemName').val(), "price": $('#itemPrice').val(), "available": $('#itemAvailable').is(':checked'), "notes": $('#itemNotes').val()};
            console.log(json);
        };
    }
    ]);