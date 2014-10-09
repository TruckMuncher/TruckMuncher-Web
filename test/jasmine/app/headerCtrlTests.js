describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('headerCtrl', function () {
        var $scope, rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $controller('headerCtrl', {$scope: $scope});
        }));

        it('should emit toggleMenu event to rootScope when scope\'s toggleMenu is called', function(){
            spyOn(rootScope, '$emit');
            $scope.toggleMenu();
            expect(rootScope.$emit).toHaveBeenCalledWith('toggleMenu');
        });
    });
});
