angular.module('TruckMuncherApp').controller('headerCtrl', ['$scope', '$rootScope', 'TokenService',
    function ($scope, $rootScope, TokenService) {
        $scope.toggleMenu = function(){
            $rootScope.$emit('toggleMenu');
        };

        $scope.loggedIn = function(){
            return TokenService.hasTokens();
        };
    }]);
