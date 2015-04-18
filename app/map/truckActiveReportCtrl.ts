angular.module('TruckMuncherApp').controller('truckActiveReportCtrl', ['$scope', 'coords', '$modalInstance', '$state',
    function ($scope, coords, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, $state: ng.ui.IStateService) {
        $scope.mapHeight = screen.height / 2.3 + 'px';

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

        $scope.$on('$stateChangeSuccess', function () {
           $modalInstance.dismiss();
        });
    }]);