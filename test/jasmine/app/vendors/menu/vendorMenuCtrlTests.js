describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('vendorMenuCtrl', function () {
        var $scope, $q;

        var mockMenuService = {
            getMenu: function(){
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        var mockTruckService = {
            getTrucksForVendor: function(){
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            $controller('vendorMenuCtrl', {$scope: $scope, MenuService: mockMenuService, TruckService: mockTruckService});
        }));

        it('should update the menu when there is a "menuUpdated" notification', function () {
            $scope.menu = null;
            $scope.$emit('menuUpdated', {});
            expect($scope.menu).toEqual({});
        });

        it('should update the selected truck when there is a "menuUpdated" notification', function () {
            $scope.menu = null;
            $scope.$emit('menuUpdated', {truckId: 'abc'});
            expect($scope.selectedTruck).toEqual('abc');
        });

        it('should request the menu for the truck when the selectedTruck changes', function(){
            spyOn(mockMenuService, 'getMenu').andCallThrough();
            $scope.selectedTruck = 'abcd';
            $scope.$apply();
            expect(mockMenuService.getMenu).toHaveBeenCalled();
        });

        it('should NOT request the menu for the truck when selectedTruck changes but the menu for that truck is being displayed already', function(){
            $scope.menu.truckId = 'abcd';
            spyOn(mockMenuService, 'getMenu');
            $scope.selectedTruck = 'abcd';
            $scope.$apply();
            expect(mockMenuService.getMenu).not.toHaveBeenCalled();
        });
    });

});