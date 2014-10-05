angular.module('vendorApp').controller('vendorMenuCtrl', ['$scope',
    function ($scope) {
        $scope.menu = null;

        $scope.$on('menuUpdated', function(event, data){
            $scope.menu = data;
        })
    }
]);