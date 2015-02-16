describe('TruckMuncherApp', function () {

    beforeEach(module('TruckMuncherApp', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    var $q, $scope;

    describe('truckDetailsCtrl', function () {

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
        var defaultTruckMenu = {
            "truckId": 'a8cf2d4d-318d-4f94-b3eb-ae13f4780521',
            "categories": [{
                "id": '1234',
                "name": 'Burgers',
                "notes": 'No Notes',
                "orderInMenu": '1',
                "menuItems": []
            }]
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
        var navMock = {
            geolocation: {
                getCurrentPosition: function () {
                }
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
        var mockMenuService = {
            getMenu: function () {
                var deferred = $q.defer();
                deferred.resolve(defaultTruckMenu);
                return deferred.promise;
            }
        };

        beforeEach(inject(function (_$q_, $rootScope, $controller) {
            $q = _$q_;
            $scope = $rootScope.$new();

            createCtrlFn = function () {
                $controller('truckDetailsCtrl',  {
                    $scope: $scope,
                    //growl: growlMock,
                    TruckService: mockTruckService,
                    TruckProfileService: mockTruckProfileService,
                    MenuService: mockMenuService,
                    navigator: navMock
                });
            };
            createCtrlFn();

        }));

        it('should check if selectedTruck is updated', function () {
            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callThrough();
            $scope.$apply();

            expect($scope.selectedTruck.id).toEqual(selectedId);

        });

        it('should make a call to getMenu', function () {
            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callThrough();
            $scope.$apply();

            expect(mockMenuService.getMenu).toHaveBeenCalledWith(selectedId);

        });

    });
});