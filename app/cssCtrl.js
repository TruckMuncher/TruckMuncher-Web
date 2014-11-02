angular.module('TruckMuncherApp').controller('cssCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.showMenu = false;

        $rootScope.$on('menuItemClicked', function () {
            $scope.showMenu = false;
        });

        $rootScope.$on('toggleMenu', function(){
            $scope.showMenu = !$scope.showMenu;
        });
    }]);
