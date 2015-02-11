angular.module('TruckMuncherApp').directive('customerMenu', [
    function (){
        return {
            restrict: 'A',
            scope: {customMenuColors: '=', menu: '='},
            replace: true,
            templateUrl: '/partials/map/customer-menu.jade'
        };
    }]);
