angular.module('TruckMuncherApp').controller('profileImageUploadCtrl',
    ['$scope', 'TruckService', 'growl', 'FileUploader', 'TimestampAndNonceService', 'TokenService',
        function ($scope, TruckService, growl, FileUploader, TimestampAndNonceService, TokenService) {
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
                //$scope.selectedTruck.imageUrl = response.url;
                $scope.displayImage = $scope.selectedTruck.imageUrl + '?' + new Date().getTime();
                $scope.progress = null;
            };

            $scope.$on('selectedTruckChanged', function (event, selectedTruck) {
                $scope.uploader.url = TruckService.getImageUploadUrl(selectedTruck.id);

                if (selectedTruck && selectedTruck.imageUrl) {
                    $scope.displayImage = selectedTruck.imageUrl + '?' + new Date().getTime();
                } else {
                    $scope.displayImage = null;
                }
            });

        }]);

