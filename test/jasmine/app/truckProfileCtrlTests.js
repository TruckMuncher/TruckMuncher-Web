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
    var selectedId = 'a8cf2d4d-318d-4f94-b3eb-ae13f4780521';
    var selectedWrongId = '12345678-wron-gsel-ecte-did12345679';
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

    var service, $q, $rootScope;

    describe('truckDetailsCtrl', function () {

        beforeEach(inject(function (_$q_, _$rootScope_) {
            $q = _$q_;
            $rootScope =_$rootScope_;
        }));

        it('should check if selectedTruck is updated', function () {
            var deferred = $q.defer();

            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callFake(function() {
                return deferred.promise;
            });
            $rootScope.$apply();

            console.log($rootScope.selectedTruck);

            expect($rootScope.selectedTruck).toBe(true);

        });

    });
});