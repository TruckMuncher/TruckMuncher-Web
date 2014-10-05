describe('vendorApp', function () {
    beforeEach(module('vendorApp'));

    describe('vendorMenuCtrl', function () {
        var $scope, $rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $rootScope = $rootScope;
            $controller('vendorMenuCtrl', {$scope: $scope});
        }));

        it('should update the menu when there is a "menuUpdated" notification', function () {
            $scope.menu = null;
            $scope.$emit('menuUpdated', {});
            expect($scope.menu).toEqual({});
        })
    })

});