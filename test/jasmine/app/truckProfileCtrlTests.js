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
    var createCtrlFn;
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

    beforeEach(module('TruckMuncherApp', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    var $q, $scope;

    describe(function () {

        beforeEach(inject(function (_$q_, $rootScope) {
            $q = _$q_;
            $scope = $rootScope.$new();

            createCtrlFn = function () {
                $controller('truckDetailsCtrl',  {
                    $scope: $scope,
                    //growl: growlMock,
                    TruckService: mockTruckService,
                    TruckProfileService: mockTruckProfileService
                });
            };
            createCtrlFn();

        }));

        it('should check if selectedTruck is updated', function () {
            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callThrough();
            $scope.$apply();

            console.log($scope.selectedTruck);

            expect($scope.selectedTruck).toBe(true);

        });

    });
});