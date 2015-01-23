describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function(){return false;});
    }));

    describe('navCtrl', function () {
        var $scope, rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $controller('navCtrl', {$scope: $scope});
        }));
    });
});
