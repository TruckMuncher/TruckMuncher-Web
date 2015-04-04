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

        it('should retrive the user\'s trucks and set them in the state service on initialization', function () {
            var trucks = ['a', 'b', 'c'];

            spyOn(TruckService, 'getTrucksForVendor').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({trucks: trucks});
                return deferred.promise;
            });

            spyOn(StateService, 'setTrucks');

            $scope.initializeToken();
            $scope.$apply();

            expect(StateService.setTrucks).toHaveBeenCalledWith(trucks);

        });

        it('should retrive the user\'s favorites and set them in the state service on initialization', function () {
            var favorites = ['a', 'b', 'c'];

            spyOn(UserService, 'getFavorites').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({favorites: favorites});
                return deferred.promise;
            });

            spyOn(StateService, 'setFavorites');

            $scope.initializeToken();
            $scope.$apply();

            expect(StateService.setFavorites).toHaveBeenCalledWith(favorites);

        });
    });
})
;