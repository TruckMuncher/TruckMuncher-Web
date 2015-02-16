describe('TruckMuncherApp', function () {
    var defaultTruckLocation = {
        "id": "a8cf2d4d-318d-4f94-b3eb-ae13f4780521",
        "latitude": 43.0500,
        "longitude": 87.9500
    };
    var defaultTruckProfile = {
        "id": "a8cf2d4d-318d-4f94-b3eb-ae13f4780521",
        "name": "PizzaGuy",
        "imageUrl": "http://pizzaguywi.com/lib/img/logo.png",
        "keywords": ["pizza", "italian"],
        "primaryColor": "#3344BB",
        "secondaryColor": "#CFEA22"
    };
    var mockTruckService = {
        getActiveTrucks: function () {
            var deferred = $q.defer();
            deferred.resolve({
                trucks: [defaultTruckLocation]
            });
            return deferred.promise;
        }
    };
    var mockTruckProfileService = {
        tryGetTruckProfile: function () {
            var deferred = $q.defer();
            deferred.resolve(defaultTruckProfile);
            return deferred.promise;
        },
        updateTruckProfiles: function () {
            var deferred = $q.defer();
            deferred.resolve({
                trucks: [defaultTruckProfile]
            });
            return deferred.promise;
        }
    };
    beforeEach(module('TruckMuncherApp', function ($provide, $urlRouterProvider) {
        $provide.value('TruckService', mockTruckService);
        $provide.value('TruckProfileService', mockTruckProfileService);
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    var sut, $q, $rootScope;

    describe('markerService', function () {
        beforeEach(inject(function (MarkerService, _$q_, _$rootScope_) {
            sut = MarkerService;
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        it('should get active trucks from API with provided coordinates', function () {
            var deferred = $q.defer();
            spyOn(mockTruckService, 'getActiveTrucks').and.callFake(function(){
                return deferred.promise;
            });

            sut.getMarkers({latitude: 1, longitude: 2});
            expect(mockTruckService.getActiveTrucks).toHaveBeenCalled();
        });

        it('should assign the truck profile to the marker', function () {
            sut.getMarkers({latitude: 1, longitude: 2}).then(function (markers) {
                expect(markers[0].id).toEqual(defaultTruckProfile.id);
                expect(markers[0].truckProfile).toEqual(defaultTruckProfile);
            });
            $rootScope.$apply();
        });

        it('should assign the truck coordinates to the marker', function () {
            sut.getMarkers({latitude: 1, longitude: 2}).then(function (markers) {
                expect(markers[0].coords.latitude).toEqual(defaultTruckLocation.latitude);
                expect(markers[0].coords.longitude).toEqual(defaultTruckLocation.longitude);
            });
            $rootScope.$apply();
        });
    });

});
