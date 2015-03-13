interface ITruckProfilesScope extends ng.IScope {
    displayedTrucks: Array<ITruckProfile>;
    loading:boolean;
    searchQuery: string;

    simpleSearch(searchQuery:string);
}


angular.module('TruckMuncherApp').controller('truckProfilesCtrl', ['$scope', 'TruckProfileService', 'SearchService', '$analytics',
    function ($scope:ITruckProfilesScope, TruckProfileService:ITruckProfileService, SearchService:ISearchService, $analytics:IAngularticsService) {
        var allTrucks:Array<ITruckProfile> = TruckProfileService.allTrucksFromCookie();
        $scope.displayedTrucks = TruckProfileService.allTrucksFromCookie();

        TruckProfileService.updateTruckProfiles().then((response) => {
            allTrucks = response;
            $scope.displayedTrucks = response;
        });

        $scope.loading = false;

        $scope.simpleSearch = (query) => {
            $scope.loading = true;

            SearchService.simpleSearch(query, 100, 0).then((results) => {
                $scope.displayedTrucks =
                    _.chain(results.searchResponse)
                        .map((item) => { return item.truck; })
                        .uniq('id')
                        .value();
                $scope.loading = false;
            });
            $analytics.eventTrack('SimpleSearch', {category: 'TruckProfiles', label: query});
        };

        $scope.$watch('searchQuery', () => {
            if ($scope.searchQuery !== undefined && $scope.searchQuery.length === 0 && $scope.displayedTrucks.length < allTrucks.length) {
                $scope.displayedTrucks = allTrucks;

                $analytics.eventTrack('SearchCleared', {category: 'Map'});
            }
        });
    }]);
