angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope', 'TruckService',
    function ($scope, TruckService) {
        $scope.trucks = [];


        $scope.submit = function () {
            console.log($scope.truckName + $scope.keywords);
        };

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0];
            }
        });
    }]);
