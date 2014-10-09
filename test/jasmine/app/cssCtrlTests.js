describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('cssCtrl', function () {
        var $scope, rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $controller('cssCtrl', {$scope: $scope});
        }));

        it('should set showMenu should be set to true if false when toggleMenu event is detected', function () {
            $scope.showMenu = false;
            rootScope.$broadcast('toggleMenu', null);
            expect($scope.showMenu).toEqual(true);
        });

        it('should hide the menu when menuItemClicked is detected', function(){
            $scope.showMenu = true;
            rootScope.$broadcast('menuItemClicked', null);
            expect($scope.showMenu).toEqual(false);
            rootScope.$broadcast('menuItemClicked', null);
            expect($scope.showMenu).toEqual(false);
        });

    });
});
