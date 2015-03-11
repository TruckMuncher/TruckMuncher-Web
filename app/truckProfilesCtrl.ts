interface ITruckProfilesScope extends ng.IScope {
    displayedTrucks: Array<ITruckProfile>;
    loading:boolean;
    searchQuery: string;

    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfilesCtrl', ['$scope', 'TruckProfileService', 'SearchService', '$analytics', '$filter',
    function ($scope:ITruckProfilesScope, TruckProfileService:ITruckProfileService, SearchService:ISearchService, $analytics:IAngularticsService, $filter:ng.IFilterService) {
        var allTrucks: Array<ITruckProfile> = TruckProfileService.allTrucksFromCookie();
        $scope.displayedTrucks = TruckProfileService.allTrucksFromCookie();

        TruckProfileService.updateTruckProfiles().then(function (response) {
            allTrucks = response;
            $scope.displayedTrucks = response;
        });

        $scope.loading = false;

        $scope.simpleSearch = (query) => {
            $scope.loading = true;

            SearchService.simpleSearch(query, 20, 0).then((results)=> {
                $scope.displayedTrucks = _.map(results.searchResponse, (truck) => {
                    return truck.truck;
                });
                $scope.loading = false;
            });
            $analytics.eventTrack('SimpleSearch', {category: 'TruckProfiles', label: query});
        };
        $scope.$watch('searchQuery', function () {
            if ($scope.searchQuery !== undefined && $scope.searchQuery.length === 0 && $scope.displayedTrucks.length < allTrucks.length) {
                $scope.displayedTrucks = allTrucks;

                $analytics.eventTrack('SearchCleared', {category: 'Map'});
            }
        });
    }]);
