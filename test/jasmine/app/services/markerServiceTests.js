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
        allTrucksInStoredProfiles: function () {
            return true;
        },
        cookieNeedsUpdate: function () {
            return false;
        },
        getTruckProfile: function () {
            return defaultTruckProfile;
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
            var mock = sinon.mock(mockTruckService);
            var deferred = $q.defer();

            mock.expects("getActiveTrucks").withArgs(1, 2).atLeast(1).returns(deferred.promise);

            sut.getMarkers({latitude: 1, longitude: 2});
            mockTruckService.getActiveTrucks.restore();
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

        it('should update truck profiles when not all of the active trucks are stored in the cookie', function () {
            var mock = sinon.mock(mockTruckProfileService);
            mock.expects('allTrucksInStoredProfiles').atLeast(1).returns(false);
            spyOn(mockTruckProfileService, 'updateTruckProfiles').and.callThrough();

            sut.getMarkers({latitude: 1, longitude: 2});
            $rootScope.$apply();

            expect(mockTruckProfileService.updateTruckProfiles).toHaveBeenCalled();
            mockTruckProfileService.allTrucksInStoredProfiles.restore();
        });

        it('should update truck profiles when cookie needs update', function () {
            var mock = sinon.mock(mockTruckProfileService);
            mock.expects('cookieNeedsUpdate').atLeast(1).returns(true);
            spyOn(mockTruckProfileService, 'updateTruckProfiles').and.callThrough();

            sut.getMarkers({latitude: 1, longitude: 2});
            $rootScope.$apply();

            expect(mockTruckProfileService.updateTruckProfiles).toHaveBeenCalled();
            mockTruckProfileService.cookieNeedsUpdate.restore();
        });

    });

})
;
