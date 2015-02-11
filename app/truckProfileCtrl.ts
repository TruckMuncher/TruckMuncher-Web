interface ITruckProfileScope extends ng.IScope {

    allTrucks: Array<ITruckProfile>;
    selectedTruck: ITruckProfile;
    menu:IMenu;
    loading:boolean;
    truckProfile:ITruckProfile;
    truck:ITruckProfile;
    activeTruck:IActiveTruck;
    customMenuColors:CustomMenuColors;
    tempTrucks:Array<ITruckProfile>;
    activeTrucks:Array<IActiveTruck>;
    isOnline:boolean;
    map:{center:{}; zoom:number};
    mapHeight: string;
    truckCoords:{latitude:number; longitude:number};
    icon:string;

    populateProfile(truck:IActiveTruck, lat:number, lon: number);
    onProfileClicked(truck);
    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfileCtrl', ['$scope', 'growl', 'colorService', 'TruckService', 'TruckProfileService', 'SearchService', 'MenuService',
    ($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, MenuService) => new TruckProfileCtrl($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, MenuService)]);

class TruckProfileCtrl {
    constructor(
        private $scope:ITruckProfileScope,
        private growl:IGrowlService,
        private colorService:IColorService,
        private TruckService:ITruckService,
        private TruckProfileService:ITruckProfileService,
        private SearchService:ISearchService,
        private MenuService:IMenuService
    ) {
        var lat;
        var lon;

        $scope.allTrucks = [];
        $scope.selectedTruck = null;
        $scope.menu = null;
        $scope.truck = null;
        $scope.activeTruck = null;
        $scope.customMenuColors = null;
        $scope.tempTrucks = null;
        $scope.loading = true;
        $scope.activeTrucks = [];
        $scope.isOnline = false;
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

            $scope.loading = true;

            TruckService.getTruckProfiles(lat, lon).then(function (results) {

                if (TruckProfileService.allTrucksInStoredProfiles(results.trucks) && !TruckProfileService.cookieNeedsUpdate()) {
                    for (var i = 0; i < results.trucks.length; i++) {

                        $scope.allTrucks.push(results.trucks[i]);
                    }

                    $scope.loading = false;
                } else {

                    TruckProfileService.updateTruckProfiles(lat, lon).then(function(response) {

                        for(var i = 0; i < response.trucks.length; i++){
                            $scope.allTrucks.push(response.trucks[i]);
                        }
                        $scope.loading = false;

                    });

                }

            });

            TruckService.getActiveTrucks(lat, lon).then(function(results) {

                for(var i = 0; i < results.trucks.length; i++) {
                    $scope.activeTrucks.push(results.trucks[i]);
                }


            });

            $scope.map.center = {latitude: lat, longitude: lon};

        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        $scope.onProfileClicked = function (truck) {
            $scope.isOnline = false;
            $scope.selectedTruck = truck;
            $scope.customMenuColors = colorService.getCustomMenuColorsForTruck(truck);

            $scope.activeTruck = _.find($scope.activeTrucks, function(x) {
                return x.id === $scope.selectedTruck.id;
            });

            if ($scope.activeTruck !== null) {
                $scope.isOnline = true;
            }

            $scope.truckCoords = {latitude:$scope.activeTruck.latitude, longitude:$scope.activeTruck.longitude};
            $scope.map.center = {
                latitude: $scope.activeTruck.latitude,
                longitude: $scope.activeTruck.longitude
            }

            console.log($scope.selectedTruck.id);
            console.log($scope.truckCoords);


        };

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck !== null) {

                MenuService.getMenu($scope.selectedTruck.id).then(function (response) {
                    $scope.menu = response.menu;
                });
            }
        });

        $scope.simpleSearch = (query) => {

            $scope.allTrucks = [];

            $scope.loading = true;
            SearchService.simpleSearch(query, 20, 0).then(function (results) {
                for (var i = 0; i < results.searchResponse.length; i++) {
                    console.log(results.searchResponse[i].truck);
                    $scope.allTrucks.push(results.searchResponse[i].truck);
                }
                $scope.loading = false;
            });
        };

    }
}

