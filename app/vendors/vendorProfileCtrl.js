angular.module('TruckMuncherApp').controller('vendorProfileCtrl',
    ['$scope', 'TruckService', 'growl', 'FileUploader', 'httpHelperService', 'TimestampAndNonceService', 'TokenService',
        function ($scope, TruckService, growl, FileUploader, httpHelperService, TimestampAndNonceService, TokenService) {
            $scope.trucks = [];
            $scope.selectedTruck = {};
            $scope.tags = [];
            $scope.uploader = new FileUploader({
                autoUpload: true,
                headers: {
                    Authorization: 'session_token=' + TokenService.getToken(),
                    Accept: 'application/json',
                    'X-Nonce': TimestampAndNonceService.getNonce(),
                    'X-Timestamp': TimestampAndNonceService.getTimestamp()
                }
            });

            $scope.uploader.onAfterAddingFile = function (item) {
                $scope.imageName = item.file.name;
            };

            $scope.uploader.onProgressItem = function (item, progress) {
                $scope.progress = progress;
            };

            $scope.uploader.onErrorItem = function () {
                growl.addErrorMessage('Error: could not upload image');
            };

            $scope.uploader.onSuccessItem = function (fileItem, response) {
                $scope.selectedTruck.imageUrl = response.url;
                $scope.displayImage = $scope.selectedTruck.imageUrl + '?' + new Date().getTime();
                $scope.progress = null;
            };

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
                    growl.addSuccessMessage('Profile Updated Successfully');
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
                $scope.tags = _.map($scope.selectedTruck.keywords, function (keyword) {
                    return {text: keyword};
                });
                $scope.uploader.url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + $scope.selectedTruck.id;

                if ($scope.selectedTruck && $scope.selectedTruck.imageUrl) {
                    $scope.displayImage = $scope.selectedTruck.imageUrl + '?' + new Date().getTime();
                } else {
                    $scope.displayImage = null;
                }
            });
        }]);
