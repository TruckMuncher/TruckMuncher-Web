var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d{1,2})?$/;
angular.module('TruckMuncherApp').directive('smartPrice', function() {
    return {
        require: 'ngModel',
        link: function(scope: ng.IScope, elm: ng.IRootElementService, attrs: ng.IAttributes, ctrl: ng.INgModelController) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});