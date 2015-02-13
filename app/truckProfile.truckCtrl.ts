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
    coords:{latitude:number; longitude:number};

    activeTruckCheck(activeTrucks:Array<IActiveTruck>, selectedTruckString:string);

}
angular.module('TruckMuncherApp').controller('truckProfileTruckCtrl', ['$scope', 'growl', '$stateParams', 'TruckProfileService', 'colorService', 'TruckService', 'MenuService', '$analytics', 'navigator',
    ($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService, $analytics, navigator) => new TruckProfilePartialCtrl($scope, growl, $stateParams, TruckProfileService, ColorService, TruckService, MenuService, $analytics, navigator)]);

class TruckProfilePartialCtrl {
    constructor(private $scope:ITruckProfileTruckScope,
                private growl:IGrowlService,
                private $stateParams:ng.ui.IStateParamsService,
                private TruckProfileService:ITruckProfileService,
                private colorService:IColorService,
                private TruckService:ITruckService,
                private MenuService:IMenuService,
                private $analytics:IAngularticsService,
                private navigator:Navigator
    ) {

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
        $scope.activeTrucks = [];
        $scope.customMenuColors = null;

        this.navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.coords = pos.coords;

            $scope.selectedTruck = TruckProfileService.getTruckProfile($stateParams['id']);

                TruckService.getActiveTrucks($scope.coords.latitude, $scope.coords.longitude).then(function (results) {

                    $scope.activeTruckCheck(results.trucks, $scope.selectedTruck.id);

                    $scope.truckCoords = {latitude: $scope.activeTruck.latitude, longitude: $scope.activeTruck.longitude};
                    $scope.map.center = {
                        latitude: $scope.activeTruck.latitude,
                        longitude: $scope.activeTruck.longitude
                    }

                });

        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck !== null) {

                MenuService.getMenu($scope.selectedTruck.id).then(function (response) {
                    $scope.menu = response.menu;
                });
                $scope.customMenuColors = colorService.getCustomMenuColorsForTruck($scope.selectedTruck);
            }

            $analytics.eventTrack('profile', {category: 'truckProfile', label: $scope.selectedTruck.name});


        });

        $scope.activeTruckCheck = function (activeTrucks, selectedTruckString) {
            $scope.isOnline = false;
            for (var i = 0; i < activeTrucks.length; i++) {
                $scope.activeTrucks.push(activeTrucks[i]);
            }

            $scope.activeTruck = _.find($scope.activeTrucks, function (x) {

                return x.id === selectedTruckString;
            });

            if ($scope.activeTruck !== undefined) {

                $scope.isOnline = true;
            } else {
                $scope.isOnline = false;
            }

        }

    }
}
