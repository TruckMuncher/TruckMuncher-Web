describe('TruckMuncherApp', function () {

    beforeEach(module('TruckMuncherApp', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    describe('truckProfilesCtrl', function () {
        var $q, $scope;

        var mockSearchService = {
            simpleSearch: function () { }
        };

        var truckProfileServiceMock = {
            updateTruckProfiles: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            },
            allTrucksFromCache: function () {}
        };

        beforeEach(inject(function (_$q_, $rootScope, $controller) {
            $q = _$q_;
            $scope = $rootScope.$new();

            $controller('truckProfilesCtrl', {
                $scope: $scope,
                SearchService: mockSearchService,
                TruckProfileService: truckProfileServiceMock
            });
        }));


        it('should only show unique results from search', function () {
            spyOn(mockSearchService, 'simpleSearch').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({
                    searchResponse: [
                        {truck: {'id': 1}},
                        {truck: {'id': 1}},
                        {truck: {'id': 2}}
                    ]
                });
                return deferred.promise;
            });

            $scope.simpleSearch('asdf');
            $scope.$apply();

            expect($scope.displayedTrucks).toEqual([{'id': 1}, {'id': 2}]);
        });
    });
});
