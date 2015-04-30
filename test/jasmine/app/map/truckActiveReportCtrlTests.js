describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {return false;});
    }));

    describe('truckActiveReportCtrl', function () {
        var $scope, $q;
        var coords = {latitude: 1, longitude: 1};
        var mockModalInstance = {};
        var mockStateService = {
            getTrucks: function () {return [];}
        };
        var mockTruckProfileService = {
            updateTruckProfiles: function () {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            }
        };

        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            $controller('truckActiveReportCtrl', {
                $scope: $scope,
                coords: coords,
                TruckProfileService: mockTruckProfileService,
                $modalInstance: mockModalInstance,
                StateService: mockStateService
            });
        }));

        it('should set userOwnsTruck to true when StateService has the truck that is selected', function () {
            $scope.selectedTruckId = 'truck';

            spyOn(mockStateService, 'getTrucks').and.callFake(function () {
                return ([{id: 'truck'}]);
            });
            $scope.$apply();

            expect($scope.userOwnsTruck).toBe(true);
        });

        it('should set userOwnsTruck to false when StateService DOES NOT have the truck that is selected', function () {
            $scope.selectedTruckId = 'truck';

            spyOn(mockStateService, 'getTrucks').and.callFake(function () {
                return ([{id: 'NOTtruck'}]);
            });
            $scope.$apply();

            expect($scope.userOwnsTruck).toBe(false);
        });
    });
});