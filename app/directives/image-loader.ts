angular.module('TruckMuncherApp').directive('imageLoader', ['$timeout',
    function ($timeout:ng.ITimeoutService) {
        var link = function (scope:ng.IScope, elem) {
            elem.on('load', function () {
                $timeout(function () {
                    scope['isLoading'] = false;
                });
            });

            scope.$watch('mysrc', function () {
                $timeout(function () {
                    scope['isLoading'] = true;
                });
            });
        };

        return {
            restrict: 'A',
            scope: {mysrc: '=', isLoading: '='},
            link: link
        };
    }]);
