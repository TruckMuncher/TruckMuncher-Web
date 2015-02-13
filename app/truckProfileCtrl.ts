interface ITruckProfileScope extends ng.IScope {

    allTrucks: Array<ITruckProfile>;
    loading:boolean;
    truckProfile:ITruckProfile;
    truck:ITruckProfile;
    customMenuColors:CustomMenuColors;
    tempTrucks:Array<ITruckProfile>;
    map:{center:{}; zoom:number};
    truckCoords:{latitude:number; longitude:number};
    selectedTruck:ITruckProfile;
    coords:{latitude:number; longitude:number};

    populateProfile(truck:IActiveTruck, lat:number, lon:number);
    onProfileClicked(truck);
    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfileCtrl', ['$scope', 'growl', 'colorService', 'TruckService', 'TruckProfileService', 'SearchService', 'MenuService', '$analytics', 'navigator',
    ($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, MenuService, $analytics, navigator) => new TruckProfileCtrl($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, MenuService, $analytics, navigator)]);

class TruckProfileCtrl {
    constructor(private $scope:ITruckProfileScope,
                private growl:IGrowlService,
                private colorService:IColorService,
                private TruckService:ITruckService,
                private TruckProfileService:ITruckProfileService,
                private SearchService:ISearchService,
                private MenuService:IMenuService,
                private $analytics:IAngularticsService,
                private navigator:Navigator) {

        $scope.allTrucks = [];
        $scope.truck = null;
        $scope.customMenuColors = null;
        $scope.tempTrucks = null;
        $scope.loading = true;
        $scope.selectedTruck = null;

        this.navigator.geolocation.getCurrentPosition(function (pos) {

            $scope.coords = pos.coords;

            $scope.loading = true;

            TruckService.getTruckProfiles($scope.coords.latitude, $scope.coords.longitude).then(function (results) {

                if (TruckProfileService.allTrucksInStoredProfiles(results.trucks) && !TruckProfileService.cookieNeedsUpdate()) {
                    for (var i = 0; i < results.trucks.length; i++) {

                        $scope.allTrucks.push(results.trucks[i]);
                    }

                    $scope.loading = false;
                } else {

                    TruckProfileService.updateTruckProfiles($scope.coords.latitude, $scope.coords.longitude).then(function (response) {

                        for (var i = 0; i < response.trucks.length; i++) {
                            $scope.allTrucks.push(response.trucks[i]);
                        }
                        $scope.loading = false;
                    });
                }
            });
        });

        $scope.simpleSearch = (query) => {

            $scope.allTrucks = [];

            $scope.loading = true;
            SearchService.simpleSearch(query, 20, 0).then(function (results) {
                for (var i = 0; i < results.searchResponse.length; i++) {

                    $scope.allTrucks.push(results.searchResponse[i].truck);
                }
                $scope.loading = false;
            });

            $analytics.eventTrack('SimpleSearch', {category: 'Map', label: query});
        };

    }
}

