/* @flow */
angular.module('TruckMuncherApp').directive('imageLoader', ['$timeout', function ($timeout) {
    var link = function (scope, elem) {
        elem.on('load', function () {
            $timeout(function () {
                scope.isLoading = false;
            });
        });

        scope.$watch('mysrc', function () {
            $timeout(function () {
                scope.isLoading = true;
            });
        });
    };

    return {
        restrict: 'A',
        scope: {mysrc: '=', isLoading: '='},
        link: link
    };
}]);
