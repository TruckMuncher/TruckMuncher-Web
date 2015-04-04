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
            "menu": {
                "truckId": 'a8cf2d4d-318d-4f94-b3eb-ae13f4780521',
                "categories": [{
                    "id": '1234',
                    "name": 'Burgers',
                    "notes": 'No Notes',
                    "orderInMenu": '1',
                    "menuItems": []
                }]
            }
        };
        var selectedId = 'a8cf2d4d-318d-4f94-b3eb-ae13f4780521';
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
        var mockColorService = {
            getCustomMenuColorsForTruck: function () { }
        };

        var growlMock = {
            addErrorMessage: function () { }
        };
        var createControllerFn;

        beforeEach(inject(function (_$q_, $rootScope, $controller) {
            $q = _$q_;
            $scope = $rootScope.$new();

            createControllerFn = function () {
                $controller('truckDetailsCtrl', {
                    $scope: $scope,
                    growl: growlMock,
                    TruckService: mockTruckService,
                    TruckProfileService: mockTruckProfileService,
                    MenuService: mockMenuService,
                    ColorService: mockColorService,
                    navigator: navMock
                });
            };
            createControllerFn();

        }));

        it('should check if selectedTruck is updated', function () {
            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callThrough();
            $scope.$apply();

            expect($scope.selectedTruck.id).toEqual(selectedId);

        });

        it('should make a call to getMenu', function () {
            spyOn(mockMenuService, 'getMenu').and.callThrough();
            $scope.$apply();

            expect(mockMenuService.getMenu).toHaveBeenCalledWith(selectedId);
        });

        it('should set the menu from the selected trucks profile', function () {
            spyOn(mockMenuService, 'getMenu').and.callThrough();
            $scope.selectedTruck = defaultTruckProfile;
            $scope.$apply();

            expect($scope.menu).toEqual(defaultTruckMenu.menu);

        });

        it('should call the getActiveTrucks service', function () {
            spyOn(mockTruckService, 'getActiveTrucks').and.callThrough();
            $scope.$apply();

            expect(mockTruckService.getActiveTrucks).toHaveBeenCalled();
        });

        it('should set online status to be true', function () {
            $scope.$apply();

            expect($scope.isOnline).toBe(true);
        });

        it('should not set online status to be true if selected truck is not active', function () {
            spyOn(mockTruckService, 'getActiveTrucks').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({trucks: []});
                return deferred.promise;
            });
            $scope.$apply();

            expect($scope.isOnline).toBe(false);
        });

        it('should notify of error if cannot get truck profile from service', function () {
            spyOn(mockTruckProfileService, 'tryGetTruckProfile').and.callFake(function () {
                var deferred = $q.defer();
                deferred.reject('');
                return deferred.promise;
            });
            spyOn(growlMock, 'addErrorMessage');
            createControllerFn();
            $scope.$apply();

            expect(growlMock.addErrorMessage).toHaveBeenCalled();
        });

        it('should set the coords of the truck', function () {
            $scope.$apply();

            expect($scope.truckCoords.latitude).toEqual(defaultTruckLocation.latitude);
            expect($scope.truckCoords.longitude).toEqual(defaultTruckLocation.longitude);
        });

        it('should return the colors for the truck', function () {
            spyOn(mockColorService, 'getCustomMenuColorsForTruck').and.callFake(function () {
                    return {
                        "primary": "#3344BB",
                        "secondary": "#CFEA22",
                        "primaryContrast": "#FFFFFF",
                        "secondaryContrast": "#000000"
                    };
                }
            );

            $scope.selectedTruck = defaultTruckProfile;
            $scope.$apply();

            expect($scope.customMenuColors.primary).toEqual("#3344BB");
        });

        it('should set the map center to the truckCoords', function () {
            $scope.selectedTruck = defaultTruckProfile;
            $scope.$apply();

            expect($scope.map.center).toEqual($scope.truckCoords);

        });


    });
});