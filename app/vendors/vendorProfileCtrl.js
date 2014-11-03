angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope', 'TruckService', 'growl',
    function ($scope, TruckService, growl) {
        $scope.trucks = [];
        $scope.selectedTruck = {};
        $scope.tags = [];

        $scope.submit = function () {
            var keywords = _.map($scope.tags, function (tag) {
                return tag.text;
            });

            TruckService.modifyTruckProfile(
                $scope.selectedTruck.id,
                $scope.selectedTruck.name,
                $scope.selectedTruck.imageUrl,
                keywords).then(function () {
                    growl.addSuccessMessage('Profile Updated Successfully', {ttl: 2000});
                }, function (error) {
                    growl.addErrorMessage('Error: profile was not saved', {ttl: 2000});
                });
        };

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0];
            }
        });

        $scope.$watch('selectedTruck', function () {
            $scope.tags = _.map($scope.selectedTruck.keywords, function (keyword) {
                return {text: keyword};
            });
        });
    }]);
