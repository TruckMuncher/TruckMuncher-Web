angular.module('TruckMuncherApp').directive('bootstrapTooltip', [
    function (){
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem.tooltip();
            }
        };
    }]);