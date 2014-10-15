angular.module('TruckMuncherApp', ['ui.bootstrap']).controller('itemDetailsCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams, $modal) {

        $scope.categories = {"item": "test1", "item2":"test2"};

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'itemDetailsModalCtrl'
            });
        }

        $scope.openModal();


    }

]);


angular.module('TruckMuncherApp').controller('itemDetailsModalCtrl', function($scope, $modalInstance, $modal) {

    $scope.ok = function() {
        var json = {"name":$('#itemName').val(), "price":$('#itemPrice').val(), "available":$('#itemAvailable').is(':checked'), "notes":$('#itemNotes').val()}
        console.log(json)
    }

    $scope.cancel = function () {
        console.log("cancel")
    }
});