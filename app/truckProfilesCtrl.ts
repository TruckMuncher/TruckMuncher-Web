interface ITruckProfilesScope extends ng.IScope {
    allTrucks: Array<ITruckProfile>;
    loading:boolean;

    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfilesCtrl', ['$scope', 'TruckProfileService', 'SearchService', '$analytics', 'navigator',
    function ($scope:ITruckProfilesScope, TruckProfileService:ITruckProfileService, SearchService:ISearchService, $analytics:IAngularticsService, navigator:Navigator) {
        $scope.allTrucks = TruckProfileService.allTrucksFromCookie();
        $scope.loading = false;

        $scope.simpleSearch = (query) => {
            $scope.loading = true;
            SearchService.simpleSearch(query, 20, 0).then((results)=> {
                $scope.allTrucks = _.map(results.searchResponse, (truck) => {
                    return truck.truck;
                });
                $scope.loading = false;
            });

            $analytics.eventTrack('SimpleSearch', {category: 'TruckProfiles', label: query});
        };
    }]);
