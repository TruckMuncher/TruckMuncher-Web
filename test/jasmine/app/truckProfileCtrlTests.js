describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    describe('truckProfileCtrl', function () {

        var $scope;
        var createCtrlFn;

        var navMock = {
            geolocation: {
                getCurrentPosition: function () {
                }
            }
        };

        beforeEach(inject(function ($rootScope, $controller) {

            $scope = $rootScope.$new();

            createCtrlFn = function () {
                $controller('truckProfileCtrl', {
                    $scope: $scope,
                    navigator: navMock
                });
            };
            createCtrlFn();
        }));

        it('should check active trucks for the current truck', function () {
            var activeTrucks = [{id: '1234', latitude: 0, longitude: 0}, {id: "2345", latitude: 1, longitude: 1}];
            var selectedTruckString = '1234';

            $scope.activeTruckCheck(activeTrucks, selectedTruckString);

            expect($scope.isOnline.toEqual(true));

        });

    });
});