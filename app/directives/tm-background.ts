angular.module('TruckMuncherApp').directive('tmBackground', ['$timeout', function ($timeout) {
    return {
        link: function (scope:ng.IScope, element) {
            var minDimension = Math.min(screen.width, screen.height);
            var url = minDimension < 500 ? '/img/MkeBackground-small.jpg' : '/img/MkeBackground.jpg';

            $timeout(function(){
                element.css({'background-image': 'url(' + url + ')'});
            });
        },
        restrict: 'A',
        replace: true
    }
}]);