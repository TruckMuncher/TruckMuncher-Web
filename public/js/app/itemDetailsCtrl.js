angular.module('TruckMuncherApp').controller('itemDetailsCtrl', ['$scope', '$stateParams', '$modal',
    function ($scope, $stateParams, $modal) {

        $scope.categories = {"item": "test1", "item2":"test2"};

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'itemDetailsModalCtrl'
            });

            modalInstance.result.then(function(response){

            }, function(){

            });
        };

        $scope.openModal();
    }

]);


angular.module('TruckMuncherApp').controller('itemDetailsModalCtrl', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {

    $scope.ok = function() {
        var json = {"name":$('#itemName').val(), "price":$('#itemPrice').val(), "available":$('#itemAvailable').is(':checked'), "notes":$('#itemNotes').val()}
        console.log(json)
    };

    $scope.cancel = function () {
        console.log("cancel")
    }
}]);