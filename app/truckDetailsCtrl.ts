interface ITruckDetailsScope extends ng.IScope {
    isOnline:boolean;
    selectedTruck:ITruckProfile;
    customMenuColors:CustomMenuColors;
    truckCoords:{latitude:number; longitude:number};
    map:{center:{}; zoom:number};
    mapHeight: string;
    menu:IMenu;
    icon:string;
    coords:{latitude:number; longitude:number};

}
angular.module('TruckMuncherApp').controller('truckDetailsCtrl', ['$scope', 'growl', '$stateParams', 'TruckProfileService', 'colorService', 'TruckService', 'MenuService', '$analytics', 'navigator',
    ($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService, $analytics, navigator) => new TruckDetailsCtrl($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService, $analytics, navigator)]);

class TruckDetailsCtrl {
    constructor(private $scope:ITruckDetailsScope,
                private growl:IGrowlService,
                private $stateParams:ng.ui.IStateParamsService,
                private TruckProfileService:ITruckProfileService,
                private colorService:IColorService,
                private TruckService:ITruckService,
                private MenuService:IMenuService,
                private $analytics:IAngularticsService,
                private navigator:Navigator) {

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
        $scope.customMenuColors = null;

        $scope.selectedTruck = TruckProfileService.getTruckProfile($stateParams['id']);

        this.navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.coords = pos.coords;
        });

        $scope.$watch('coords', function () {
            if(!$scope.selectedTruck && $stateParams['id']){
                //update truck profiles
            }

            TruckService.getActiveTrucks($scope.coords.latitude, $scope.coords.longitude).then(function (results) {
                $scope.isOnline = false;

                var activeTruck = _.find(results.trucks, function (truck) {
                    return truck.id === $scope.selectedTruck.id;
                });

                if (activeTruck) {
                    $scope.isOnline = true;
                    $scope.truckCoords = {latitude: activeTruck.latitude, longitude: activeTruck.longitude};
                    $scope.map.center = $scope.truckCoords;
                }
            });
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck) {
                MenuService.getMenu($scope.selectedTruck.id).then(function (response) {
                    $scope.menu = response.menu;
                });
                $scope.customMenuColors = colorService.getCustomMenuColorsForTruck($scope.selectedTruck);

                $analytics.eventTrack('truckDetails', {label: $scope.selectedTruck.name});
            }
        });

    }
}
