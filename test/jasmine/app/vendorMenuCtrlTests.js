describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('vendorMenuCtrl', function () {
        var $scope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('vendorMenuCtrl', {$scope: $scope});
        }));

        it('should update the menu when there is a "menuUpdated" notification', function () {
            $scope.menu = null;
            $scope.$emit('menuUpdated', {});
            expect($scope.menu).toEqual({});
        });
    });
});