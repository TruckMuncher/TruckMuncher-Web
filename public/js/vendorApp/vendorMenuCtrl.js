angular.module('vendorApp').controller('vendorMenuCtrl', ['$scope', 'FullMenus',
    function ($scope, FullMenus) {
        $scope.menu = null;

        $scope.$on('menuUpdated', function(event, data){
            $scope.menu = data;
        })
    }
]);