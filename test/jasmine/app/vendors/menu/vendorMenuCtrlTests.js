describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    describe('vendorMenuCtrl', function () {
        var $scope, $q, modalDialogShouldResolve;

        var mockModalDialog = {
            launch: function () {
                var deferred = $q.defer();
                if (modalDialogShouldResolve) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
                return deferred.promise;
            }
        };

        var mockMenuService = {
            getMenu: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            },
            deleteItem: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            },
            deleteCategory: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            },
            addOrUpdateCategories: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            },
            addOrUpdateItems: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        var mockTruckService = {
            getTrucksForVendor: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            $controller('vendorMenuCtrl', {
                $scope: $scope,
                MenuService: mockMenuService,
                TruckService: mockTruckService,
                confirmDialogService: mockModalDialog
            });
        }));

        it('should not make a delete category request to the API when the user does not confirm deletion', function () {
            modalDialogShouldResolve = false;
            spyOn(mockMenuService, 'deleteCategory');
            $scope.deleteCategory();
            $scope.$apply();
            expect(mockMenuService.deleteCategory).not.toHaveBeenCalled();
        });

        it('should make a delete category request to the API when the user confirms deletion', function () {
            modalDialogShouldResolve = true;
            spyOn(mockMenuService, 'deleteCategory').and.callThrough();
            $scope.deleteCategory();
            $scope.$apply();
            expect(mockMenuService.deleteCategory).toHaveBeenCalled();
        });

        it('should not make a delete item request to the API when the user does not confirm deletion', function () {
            modalDialogShouldResolve = false;
            spyOn(mockMenuService, 'deleteItem');
            $scope.deleteItem();
            $scope.$apply();
            expect(mockMenuService.deleteItem).not.toHaveBeenCalled();
        });

        it('should make a delete item request to the API when the user confirms deletion', function () {
            modalDialogShouldResolve = true;
            spyOn(mockMenuService, 'deleteItem').and.callThrough();
            $scope.deleteItem();
            $scope.$apply();
            expect(mockMenuService.deleteItem).toHaveBeenCalled();
        });

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

        it('should request the menu for the truck when the selectedTruck changes', function () {
            spyOn(mockMenuService, 'getMenu').and.callThrough();
            $scope.selectedTruck = 'abcd';
            $scope.$apply();
            expect(mockMenuService.getMenu).toHaveBeenCalled();
        });

        it('should NOT request the menu for the truck when selectedTruck changes but the menu for that truck is being displayed already', function () {
            $scope.menu.truckId = 'abcd';
            spyOn(mockMenuService, 'getMenu');
            $scope.selectedTruck = 'abcd';
            $scope.$apply();
            expect(mockMenuService.getMenu).not.toHaveBeenCalled();
        });

        it('should call the api to update the item ordering for moveItemUp', function () {
            spyOn(mockMenuService, 'addOrUpdateItems').and.callThrough();
            $scope.selectedTruck = 'truck';
            $scope.menu = {};
            $scope.menu.categories = [
                {
                    id: '1', orderInCategory: 0, menuItems: [
                    {id: '2', orderInCategory: 0},
                    {id: '3', orderInCategory: 1}
                ]
                }
            ];

            $scope.moveItemUp('1', 1);

            expect(mockMenuService.addOrUpdateItems).toHaveBeenCalledWith([
                {id: '3', orderInCategory: 0},
                {id: '2', orderInCategory: 1}
            ], 'truck', '1');
        });

        it('should not modify the scope menu directly when changing item ordering, but rather wait for the API to respond with a success', function () {
            $scope.selectedTruck = 'truck';
            $scope.menu = {};
            $scope.menu.categories = [
                {
                    id: '1', orderInCategory: 0, menuItems: [
                    {id: '2', orderInCategory: 0},
                    {id: '3', orderInCategory: 1}
                ]
                }
            ];

            $scope.moveItemUp('1', 1);
            expect($scope.menu.categories[0].menuItems[0]).toEqual({id: '2', orderInCategory: 0});
        });

        it('should call the api to update the category ordering for moveCategoryDown', function () {
            spyOn(mockMenuService, 'addOrUpdateCategories').and.callThrough();
            $scope.selectedTruck = 'truck';
            $scope.menu = {};
            $scope.menu.categories = [
                {id: '1', orderInMenu: 0},
                {id: '2', orderInMenu: 1}
            ];

            $scope.moveCategoryDown(0);

            expect(mockMenuService.addOrUpdateCategories).toHaveBeenCalledWith([
                {id: '1', orderInMenu: 1},
                {id: '2', orderInMenu: 0}
            ], 'truck');

        });

        it('should not modify the scope menu directly when changing category ordering, but rather wait for the API to respond with a success', function () {
            $scope.selectedTruck = 'truck';
            $scope.menu = {};
            $scope.menu.categories = [
                {id: '1', orderInMenu: 0},
                {id: '2', orderInMenu: 1}
            ];

            $scope.moveCategoryDown(0);
            expect($scope.menu.categories[0]).toEqual({id: '1', orderInMenu: 0});
        });

        it('should set the custom menu colors when the selected truck changes', function () {
            $scope.$apply();
            $scope.trucks = [{id: '1', primaryColor: '#000000', secondaryColor: '#FFFFFF'}];
            $scope.selectedTruck = '1';
            $scope.$apply();
            expect($scope.customMenuColors.primary).toEqual('#000000');
            expect($scope.customMenuColors.primaryContrast).toEqual('#FFFFFF');
            expect($scope.customMenuColors.secondary).toEqual('#FFFFFF');
            expect($scope.customMenuColors.secondaryContrast).toEqual('#000000');
        });

        it('should set the custom menu colors correctly when the selected truck changes and has no colors defined', function () {
            $scope.$apply();
            $scope.trucks = [{id: '1', primaryColor: null, secondaryColor: null}];
            $scope.selectedTruck = '1';
            $scope.$apply();
            expect($scope.customMenuColors.primary).toEqual('#000000');
            expect($scope.customMenuColors.primaryContrast).toEqual('#FFFFFF');
            expect($scope.customMenuColors.secondary).toEqual('#000000');
            expect($scope.customMenuColors.secondaryContrast).toEqual('#FFFFFF');
        });
    });

});