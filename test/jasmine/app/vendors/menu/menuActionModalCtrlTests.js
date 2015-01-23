describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function(){return false;});
    }));

    describe('menuActionModalCtrl', function () {
        var $scope;
        var $state;
        var modalConfirmCallback;
        var modalCancelCallback;

        var fakeModal = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    modalConfirmCallback = confirmCallback;
                    modalCancelCallback = cancelCallback;
                }
            }
        };

        beforeEach(inject(function ($rootScope, $controller, $modal, _$state_) {
            $scope = $rootScope.$new();
            $state = _$state_;
            $state.current.data = {templateUrl: '', controller: ''};
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $controller('menuActionModalCtrl', {$scope: $scope, $modal: $modal, $state: $state});
        }));

        it('should emit a menuUpdated event with the response data when the modal successfully returns', function(){
            spyOn($scope, '$emit');
            modalConfirmCallback('theData');
            expect($scope.$emit).toHaveBeenCalledWith('menuUpdated', 'theData');
        });

        it('should go to the menu state when the modal is submitted', function(){
            spyOn($state, 'go');
            modalConfirmCallback();
            expect($state.go).toHaveBeenCalledWith('menu');
        });

        it('should not emit a menuUpdated event when the modal is dismissed without saving', function(){
            spyOn($scope, '$emit');
            modalCancelCallback('reason');
            expect($scope.$emit).not.toHaveBeenCalled();
        });

        it('should redirect to the menu state if the modal was dismissed from something other than a state change so that the route does not stay on /menu/editItem', function(){
            spyOn($state, 'go');
            modalCancelCallback('reason');
            expect($state.go).toHaveBeenCalledWith('menu');
        });

        it('should NOT redirect to the menu state if the modal was dismissed from a route change because we want to go to whatever route it is already going to', function(){
            spyOn($state, 'go');
            modalCancelCallback('dismissFromStateChange');
            expect($state.go).not.toHaveBeenCalled();
        });

    });
});
