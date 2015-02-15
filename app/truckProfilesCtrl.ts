interface ITruckProfilesScope extends ng.IScope {

    allTrucks: Array<ITruckProfile>;
    loading:boolean;
    truckProfile:ITruckProfile;
    customMenuColors:CustomMenuColors;
    map:{center:{}; zoom:number};
    truckCoords:{latitude:number; longitude:number};
    selectedTruck:ITruckProfile;
    coords:{latitude:number; longitude:number};

    populateProfile(truck:IActiveTruck, lat:number, lon:number);
    onProfileClicked(truck);
    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfilesCtrl', ['$scope', 'growl', 'colorService', 'TruckService', 'TruckProfileService', 'SearchService', '$analytics', 'navigator',
    ($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, $analytics, navigator) => new TruckProfilesCtrl($scope, growl, ColorService, TruckService, TruckProfileService, SearchService, $analytics, navigator)]);

class TruckProfilesCtrl {
    constructor(private $scope:ITruckProfilesScope,
                private growl:IGrowlService,
                private colorService:IColorService,
                private TruckService:ITruckService,
                private TruckProfileService:ITruckProfileService,
                private SearchService:ISearchService,
                private $analytics:IAngularticsService,
                private navigator:Navigator) {

        $scope.allTrucks = [];
        $scope.customMenuColors = null;
        $scope.loading = true;
        $scope.selectedTruck = null;

        this.navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.coords = pos.coords;
            $scope.loading = true;

            TruckService.getTruckProfiles($scope.coords.latitude, $scope.coords.longitude).then(function (results) {
                if (TruckProfileService.allTrucksInStoredProfiles(results.trucks) && !TruckProfileService.cookieNeedsUpdate()) {
                    $scope.allTrucks = _.map(results.trucks, function (truck) {
                        return truck;
                    });
                } else {
                    TruckProfileService.updateTruckProfiles($scope.coords.latitude, $scope.coords.longitude).then(function (results) {
                        $scope.allTrucks = _.map(results.trucks, function (truck) {
                            return truck;
                        });
                    });
                }
                $scope.loading = false;
            });
        });

        $scope.simpleSearch = (query) => {
            $scope.loading = true;
            SearchService.simpleSearch(query, 20, 0).then(function (results) {
                $scope.allTrucks = _.map(results.searchResponse, function (truck) {
                    return truck.truck;
                });
                $scope.loading = false;
            });

            $analytics.eventTrack('SimpleSearch', {category: 'TruckProfiles', label: query});
        };

    }
}

