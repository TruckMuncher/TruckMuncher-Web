describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('itemDetailsModalCtrl', function () {
        var $scope;
        var modalInstance;
        var $state;
        var rootScope;
        var $httpBackend;

        beforeEach(inject(function ($rootScope, $controller, _$state_, _$httpBackend_) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            modalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };

            $controller('itemDetailsModalCtrl', {$scope: $scope, $modalInstance: modalInstance});
        }));

        it('should dismiss the modal when the state changes', function(){
            $httpBackend.expect('GET', '/partials/vendors/vendorMenu.jade', undefined).respond(200, '');
            $state.go('menu');
            rootScope.$apply();
            expect(modalInstance.dismiss).toHaveBeenCalled();
        })

    });

    describe('itemDetailsCtrl', function () {
        var $scope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('itemDetailsCtrl', {$scope: $scope});
        }));

        it('should', function(){

        })

    });
});
