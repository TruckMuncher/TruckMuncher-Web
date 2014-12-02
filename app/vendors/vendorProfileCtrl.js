angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope', 'TruckService', 'growl',
    function ($scope, TruckService, growl) {
        $scope.trucks = [];
        $scope.selectedTruck = {};
        $scope.tags = [];

        $scope.saveTruck = function () {
            var keywords = _.map($scope.tags, function (tag) {
                return tag.text;
            });

            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(
                $scope.selectedTruck.id,
                $scope.selectedTruck.name,
                $scope.selectedTruck.imageUrl,
                keywords).then(function (response) {
                    $scope.requestInProgress = false;
                    growl.addSuccessMessage('Profile Updated Successfully');
                    refreshTruck(response);
                }, function () {
                    $scope.requestInProgress = false;
                });
        };

        $scope.createTruck = function () {
            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(null, 'New Truck', null, []).then(function (response) {
                $scope.requestInProgress = false;
                growl.addSuccessMessage('Truck Created Successfully');
                $scope.trucks.push(response);
                refreshTruck(response);
            }, function () {
                $scope.requestInProgress = false;
            });
        };

        $scope.submit = function () {
            $scope.saveTruck();
        };

        function refreshTruck(truck) {
            var index = _.findIndex($scope.trucks, function (t) {
                return t.id === truck.id;
            });
            if (index >= 0) {
                $scope.trucks[index] = truck;
                $scope.selectedTruck = truck;
            }
        }

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0];
            }
        });

        $scope.$watch('selectedTruck', function () {
           $scope.setFormValuesFromSelectedTruck();
        });

        $scope.resetTruck = function () {
            $scope.setFormValuesFromSelectedTruck();
        };

        $scope.setFormValuesFromSelectedTruck = function() {
            convertKeywordsToTags();
            if ($scope.selectedTruck) {
                $scope.newName = $scope.selectedTruck.name;
                $scope.newColor = $scope.selectedTruck.color;
            }
        };

        $scope.selectColor = function(theColor){
            $scope.newColor = theColor;
        };

        function convertKeywordsToTags() {
            $scope.tags = _.map($scope.selectedTruck.keywords, function (keyword) {
                return {text: keyword};
            });
        }
    }]);
