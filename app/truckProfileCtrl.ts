interface ITruckProfileScope extends ng.IScope {

    allTrucks: Array<ITruckProfile>;
    selectedTruck: ITruckProfile;
    menu:IMenu;
    loading:boolean;
    truckProfile:ITruckProfile;
    truck:ITruckProfile;
    customMenuColors:CustomMenuColors;
    tempTrucks:Array<ITruckProfile>;

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
        $scope.customMenuColors = null;
        $scope.tempTrucks = null;
        $scope.loading = true;

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

                        //$scope.allTrucks = response.trucks;
                        for(var i = 0; i < response.trucks.length; i++){
                            $scope.allTrucks.push(response.trucks[i]);
                            console.log("Yes Update: " + response.trucks[i].name);
                        }
                        $scope.loading = false;

                    });

                }

            });

        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        $scope.onProfileClicked = function (truck) {
            $scope.selectedTruck = truck;
           $scope.customMenuColors = colorService.getCustomMenuColorsForTruck(truck);


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
            $scope.$apply();

            $scope.loading = true;
            SearchService.simpleSearch(query, 20, 0).then(function (results) {
                for (var i = 0; i < results.searchResponse.length; i++) {
                    //$scope.truck = TruckProfileService.getTruckProfile(results.searchResponse[i].truck.id);
                    console.log(results.searchResponse[i].truck);
                    $scope.allTrucks.push(results.searchResponse[i].truck);
                }
                $scope.loading = false;
            });
        };

    }
}

