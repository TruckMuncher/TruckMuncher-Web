angular.module('TruckMuncherApp').controller('headerCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.toggleMenu = function(){
            $rootScope.$emit('toggleMenu');
        };
    }]);
