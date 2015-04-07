describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {return false;});
    }));

    describe('initCtrl', function () {
        var $scope, rootScope, StateService, httpHelperService, $q;

        function nothingPromise() {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        }

        var TruckService = {
            getTrucksForVendor: nothingPromise
        };

        var UserService = {
            getFavorites: nothingPromise
        };

        beforeEach(inject(function ($rootScope, $controller, _StateService_, _httpHelperService_, _$q_) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            httpHelperService = _httpHelperService_;
            StateService = _StateService_;
            $q = _$q_;
            $controller('initCtrl', {
                $scope: $scope,
                StateService: StateService,
                httpHelperService: _httpHelperService_,
                TruckService: TruckService,
                UserService: UserService
            });
        }));

        it('should retrieve the user\'s trucks and set them in the state service on initialization if logged in', function () {
            var trucks = ['a', 'b', 'c'];

            spyOn(TruckService, 'getTrucksForVendor').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({trucks: trucks});
                return deferred.promise;
            });

            spyOn(StateService, 'setTrucks');

            $scope.initialize('abcd');
            $scope.$apply();

            expect(StateService.setTrucks).toHaveBeenCalledWith(trucks);

        });

        it('should retrieve the user\'s favorites and set them in the state service on initialization if logged in', function () {
            var favorites = ['a', 'b', 'c'];

            spyOn(UserService, 'getFavorites').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({favorites: favorites});
                return deferred.promise;
            });

            spyOn(StateService, 'setFavorites');

            $scope.initialize('abcd');
            $scope.$apply();

            expect(StateService.setFavorites).toHaveBeenCalledWith(favorites);
        });

        it('should NOT retrieve the user\'s favorites or trucks logged not in', function () {
            spyOn(TruckService, 'getTrucksForVendor');
            spyOn(UserService, 'getFavorites');
            spyOn(StateService, 'setFavorites');
            spyOn(StateService, 'setTrucks');

            $scope.initialize();
            $scope.$apply();

            expect(TruckService.getTrucksForVendor).not.toHaveBeenCalled();
            expect(UserService.getFavorites).not.toHaveBeenCalled();
            expect(StateService.setFavorites).toHaveBeenCalledWith([]);
            expect(StateService.setTrucks).toHaveBeenCalledWith([]);
        });
    });
}) ;