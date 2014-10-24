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

        it('should make a call to the api when the form is submitted', function () {
            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem', undefined).respond(200, '');
            $scope.submit();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should prevent double submission of the form', function () {
            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem', undefined).respond(200, '');
            $scope.submit();
            $scope.submit();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should allow another submit if the first one had an error', function() {
            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem', undefined).respond(500, '');
            $scope.submit();
            $httpBackend.flush();

            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem', undefined).respond(200, '');
            $scope.submit();
            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should request the item from the API if the state is edit', function () {
            $httpBackend.expect('POST', 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem', undefined).respond(200, '');
            $state.current.name = 'menu.editItem';
            createControllerFn();
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});