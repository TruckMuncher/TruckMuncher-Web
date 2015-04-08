describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {return false;});
    }));

    describe('navCtrl', function () {
        var $scope, rootScope, $state;

        beforeEach(inject(function ($rootScope, $controller, _$state_) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $state = _$state_;
            $controller('navCtrl', {$scope: $scope});
        }));

        it('should set navbarCollapsed to true initially', function(){
           expect($scope.navbarCollapsed).toEqual(true);
        });

        it('should set navbarCollapsed to true when state changes', function(){
            $scope.navbarCollapsed = false;
            $state.go('map');
            expect($scope.navbarCollapsed).toEqual(true);
        });
    });
});
