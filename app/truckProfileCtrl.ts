interface ITruckProfileScope extends ng.IScope {

    allTrucks: Array<ITruckProfile>;
    selectedTruck: ITruckProfile;
    menu:IMenu;
    loading:boolean;
    truckProfile:ITruckProfile;
    truck:ITruckProfile;
    customMenuColors:CustomMenuColors;

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

        navigator.geolocation.getCurrentPosition(function (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            TruckService.getActiveTrucks(lat, lon).then(function (response) {

                $scope.loading = true;

                if (!_.isNull(response) && !_.isUndefined(response)) {
                    for (var i = 0; i < response.trucks.length; i++) {
                        if (TruckProfileService.cookieNeedsUpdate()) {
                            TruckProfileService.updateTruckProfiles(lat, lon).then(function(response) {

                                $scope.truck = response.trucks[i];
                                $scope.allTrucks.push($scope.truck);

                            });
                        } else {
                            $scope.truck = TruckProfileService.getTruckProfile(response.trucks[i].id);
                            $scope.allTrucks.push($scope.truck);
                        }
                    }
                } else {
                    //Could not find profile for truck
                }

                $scope.loading = false;


            });

            //getTrucks();

        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        $scope.onProfileClicked = function (truck) {
            $scope.selectedTruck = truck;
           $scope.customMenuColors = colorService.getCustomMenuColorsForTruck(truck);


        };

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck !== null) {
                //setCustomMenuColors($scope.selectedTruck);
                console.log($scope.selectedTruck);
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

