angular.module('TruckMuncherApp').directive('customerMenu', [function () {
    var link = function (scope) {
        scope.backgroundImportant = function(color) {
            return  'background-color: ' + color + '!important';
        };
    };


    return {
        restrict: 'A',
        link: link,
        scope: {menu: '=', primaryColor: '=', secondaryColor: '='},
        templateUrl: '/partials/directiveTemplates/customer-menu.jade'
    };
}]);