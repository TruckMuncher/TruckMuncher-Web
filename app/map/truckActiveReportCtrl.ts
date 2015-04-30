interface IActiveReportScope {
    selectedTruckId:string;
    allTrucks: Array<ITruckProfile>;
    map:any;
    markers:Array<{}>;
    mapHeight:string;
    close();
    report();
    $on:any;
    $watch:any;
    userOwnsTruck:boolean;
    durationOptions:{};
}
angular.module('TruckMuncherApp').controller('truckActiveReportCtrl', ['$scope', 'coords', '$modalInstance', 'TruckProfileService', 'TruckService', 'growl', 'StateService',
    function ($scope:IActiveReportScope, coords, $modalInstance:ng.ui.bootstrap.IModalServiceInstance, TruckProfileService:ITruckProfileService, TruckService:ITruckService, growl:IGrowlService, StateService:IStateService) {
        $scope.mapHeight = screen.height / 2.3 + 'px';
        $scope.selectedTruckId = null;
        $scope.userOwnsTruck = false;
        $scope.durationOptions = {
            hours: _.range(12),
            minutes: _.range(61)
        };

        TruckProfileService.updateTruckProfiles().then((response) => {
            $scope.allTrucks = _.sortBy(response || [], function(t){
                return t.name.toLowerCase();
            });
            if ($scope.allTrucks.length > 0) {
                $scope.selectedTruckId = $scope.allTrucks[0].id;
            }
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

        $scope.$watch('selectedTruckId', function () {
            $scope.userOwnsTruck = _.some(StateService.getTrucks(), {'id': $scope.selectedTruckId});
        });

        $scope.report = function () {
            TruckService.reportServingMode(
                {
                    isInServingMode: true,
                    truckLatitude: parseFloat("" + $scope.map.center.latitude),
                    truckLongitude: parseFloat("" + $scope.map.center.longitude),
                    truckId: $scope.selectedTruckId
                }).then(()=> {
                    growl.addSuccessMessage('Successfully reported active vendor');
                    $modalInstance.dismiss();
                });
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss();
        });
    }]);