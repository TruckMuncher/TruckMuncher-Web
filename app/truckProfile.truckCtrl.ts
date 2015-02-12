interface ITruckProfileTruckScope extends ng.IScope {
    isOnline:boolean;
    selectedTruck:ITruckProfile;
    customMenuColors:CustomMenuColors;
    activeTruck:IActiveTruck;
    activeTrucks:Array<IActiveTruck>;
    truckCoords:{latitude:number; longitude:number};
    map:{center:{}; zoom:number};
    mapHeight: string;
    menu:IMenu;
    icon:string;

}
angular.module('TruckMuncherApp').controller('truckProfileTruckCtrl', ['$scope', 'growl', '$stateParams', 'TruckProfileService', 'colorService', 'TruckService', 'MenuService',
    ($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService) => new TruckProfilePartialCtrl($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService)]);

class TruckProfilePartialCtrl {
    constructor(private $scope:ITruckProfileTruckScope,
                private growl:IGrowlService,
                private $stateParams:ng.ui.IStateParamsService,
                private TruckProfileService:ITruckProfileService,
                private colorService:IColorService,
                private TruckService:ITruckService,
                private MenuService:IMenuService
    ) {

        var lat, lon;
        $scope.isOnline = false;
        $scope.selectedTruck = null;
        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 13
        };
        $scope.mapHeight = screen.height / 4 + 'px';
        $scope.truckCoords = {latitude: 0, longitude: 0};
        $scope.icon = 'img/map_marker_green.png';

        navigator.geolocation.getCurrentPosition(function (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            $scope.selectedTruck = TruckProfileService.getTruckProfile($stateParams['id']);

            TruckService.getActiveTrucks(lat, lon).then(function (results) {

                for (var i = 0; i < results.trucks.length; i++) {
                    $scope.activeTrucks.push(results.trucks[i]);
                }

                $scope.activeTruck = _.find($scope.activeTrucks, function (x) {
                    return x.id === $scope.selectedTruck.id;
                });

                if ($scope.activeTruck !== null) {
                    $scope.isOnline = true;
                }

                $scope.truckCoords = {latitude: $scope.activeTruck.latitude, longitude: $scope.activeTruck.longitude};
                $scope.map.center = {
                    latitude: $scope.activeTruck.latitude,
                    longitude: $scope.activeTruck.longitude
                }

            });
        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck !== null) {

                MenuService.getMenu($scope.selectedTruck.id).then(function (response) {
                    $scope.menu = response.menu;
                });
            }
            $scope.customMenuColors = colorService.getCustomMenuColorsForTruck($scope.selectedTruck);
        });

    }
}
