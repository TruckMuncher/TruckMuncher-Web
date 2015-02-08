describe('TruckMuncherApp', function () {
    var mockTruckService = {
        getActiveTrucks: function () {
        }
    };
    beforeEach(module('TruckMuncherApp', function ($provide) {
        $provide.value('TruckService', mockTruckService);
        $provide.value('TruckProfileService', mockTruckProfileService);
    }));

    var sut, $q;
    var mockTruckProfileService = {};

    describe('markerService', function () {
        beforeEach(inject(function (MarkerService, _$q_) {
            sut = MarkerService;
            $q = _$q_;
        }));

        it('should get active trucks from API with provided coordinates', function () {
            var mock = sinon.mock(mockTruckService);
            var deferred = $q.defer();

            mock.expects("getActiveTrucks").withArgs(1, 2).atLeast(1).returns(deferred.promise);

            sut.getMarkers({latitude: 1, longitude: 2});
        });

    });

})
;
