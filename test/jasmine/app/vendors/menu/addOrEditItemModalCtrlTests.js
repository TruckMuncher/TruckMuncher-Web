describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('addOrEditItemModalCtrl', function () {
        var $scope, $state, rootScope, $httpBackend;
        var modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        var createControllerFn;

        beforeEach(inject(function ($rootScope, $controller, _$state_, _$httpBackend_) {
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $state = _$state_;
            $httpBackend = _$httpBackend_;

            createControllerFn = function () {
                $controller('addOrEditItemModalCtrl', {$scope: $scope, $modalInstance: modalInstance});
            };

            createControllerFn();
        }));

        it('should dismiss the modal when the state changes', function () {
            $httpBackend.expect('GET', '/partials/vendors/vendorMenu.jade', undefined).respond(200, '');
            $state.go('menu');
            rootScope.$apply();
            expect(modalInstance.dismiss).toHaveBeenCalled();
        });


        it('should request the item from the API if the state is edit', function () {
            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem', undefined).respond(200, '');
            $state.current.name = 'menu.editItem';
            createControllerFn();
            //TODO: uncomment this when the controller acutally does it
//            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});