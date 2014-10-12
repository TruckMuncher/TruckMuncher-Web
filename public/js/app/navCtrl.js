angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.menuItemClicked = function(){
            $rootScope.$emit('menuItemClicked');
        };
    }]);
