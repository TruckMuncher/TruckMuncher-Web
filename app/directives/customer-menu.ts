angular.module('TruckMuncherApp').directive('customerMenu', [
    function (){
        return {
            restrict: 'A',
            scope: {customMenuColors: '=', menu: '='},
            replace: true,
            templateUrl: '/partials/directiveTemplates/customer-menu.jade'
        };
    }]);