angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope',
    function ($scope) {
        $scope.truckName = null;
        $scope.keywords = null;

        $scope.submit = function(){
            console.log($scope.truckName + $scope.keywords);
        };
    }]);
