describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('navCtrl', function () {
        var $scope, rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $controller('navCtrl', {$scope: $scope});
        }));

        it('should emit menuItemClicked event to rootScope when scope\'s menuItemClicked is called', function(){
            spyOn(rootScope, '$emit');
            $scope.menuItemClicked();
            expect(rootScope.$emit).toHaveBeenCalledWith('menuItemClicked');
        });
    });
});
