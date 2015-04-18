angular.module('TruckMuncherApp').controller('truckActiveReportCtrl', ['$scope', 'coords', '$modalInstance', '$state', 'TruckProfileService',
    function ($scope, coords, $modalInstance:ng.ui.bootstrap.IModalServiceInstance, $state:ng.ui.IStateService, TruckProfileService) {
        $scope.mapHeight = screen.height / 2.3 + 'px';
        $scope.allTrucks = [];
        $scope.selectedTruck = null;

        TruckProfileService.updateTruckProfiles().then((response) => {
            $scope.allTrucks = response;
        });

        $scope.map = {
            center: coords,
            zoom: 16
        };

        $scope.markers = [{
            id: 2,
            icon: '/img/map_marker_green.png',
            coords: $scope.map.center,
            show: false,
            title: 'Truck Location'
        }];

        $scope.close = function () {
            $modalInstance.dismiss();
        };

        $scope.report = function () {
            alert('Report location: ' + $scope.map.center.latitude + ", " + $scope.map.center.longitude + "\n"
            + "Report truck: " + $scope.selectedTruck);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss();
        });
    }]);