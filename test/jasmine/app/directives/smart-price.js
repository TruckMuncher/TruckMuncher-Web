describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('smart-price', function () {
        var $scope, form;

        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope;

            var element = angular.element(
                    '<form name="form">' +
                    '<input ng-model="model.somePrice" name="somePrice" data-smart-price />' +
                    '</form>'
            );
            $scope.model = { somePrice: null };
            $compile(element)($scope);
            form = $scope.form;
        }));

        it('should be valid for 5', function(){
            form.somePrice.$setViewValue('5');
            $scope.$digest();
            expect(form.somePrice.$valid).toBe(true);
        });

        it('should be invalid for 5.', function(){
            form.somePrice.$setViewValue('5.');
            $scope.$digest();
            expect(form.somePrice.$valid).toBe(false);
        });

        it('should be invalid for 5.1', function(){
            form.somePrice.$setViewValue('5.1');
            $scope.$digest();
            expect(form.somePrice.$valid).toBe(false);
        });

        it('should be valid for 5.10', function(){
            form.somePrice.$setViewValue('5.10');
            $scope.$digest();
            expect(form.somePrice.$valid).toBe(true);
        });

        it('should be invalid for 5.101', function(){
            form.somePrice.$setViewValue('5.101');
            $scope.$digest();
            expect(form.somePrice.$valid).toBe(false);
        })
    });
});