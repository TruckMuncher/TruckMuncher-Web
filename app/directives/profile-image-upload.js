/* @flow */
angular.module('TruckMuncherApp').directive('profileImageUpload', ['TruckService', 'growl', 'FileUploader', 'TimestampAndNonceService', 'TokenService', '$timeout', 
    function (TruckService, growl, FileUploader, TimestampAndNonceService, TokenService) {
        var blankImageUri = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        var link = {
            pre: function preLink(scope) {
                scope.imageLoading = false;
                scope.uploader = new FileUploader({
                    autoUpload: true,
                    removeAfterUpload: true,
                    headers: {
                        Authorization: 'session_token=' + TokenService.getToken(),
                        Accept: 'application/json',
                        'X-Nonce': TimestampAndNonceService.getNonce(),
                        'X-Timestamp': TimestampAndNonceService.getTimestamp()
                    }
                });

                scope.uploader.onProgressItem = function (item, progress) {
                    scope.progress = progress;
                };

                scope.uploader.onErrorItem = function () {
                    growl.addErrorMessage('Error: could not upload image');
                };

                scope.uploader.onSuccessItem = function (fileItem, response) {
                    scope.truck.imageUrl = response.url + '?' + new Date().getTime();
                    scope.displayImage = scope.truck.imageUrl;
                    scope.progress = null;
                };

                scope.$watch('truck', function () {
                    scope.uploader.url = TruckService.getImageUploadUrl(scope.truck.id);

                    if (scope.truck && scope.truck.imageUrl) {
                        if (stripUIDFromImageUrl(scope.displayImage) !== scope.truck.imageUrl)
                            scope.displayImage = scope.truck.imageUrl + '?' + new Date().getTime();
                    } else {
                        scope.displayImage = blankImageUri;
                    }
                });

                function stripUIDFromImageUrl(imageUrl) {
                    if (imageUrl)return imageUrl.substring(0, imageUrl.lastIndexOf('?'));
                    else return "";
                }

            }
        };

        return {
            restrict: 'A',
            link: link,
            scope: {truck: '='},
            replace: true,
            templateUrl: '/partials/directiveTemplates/profile-image-upload.jade'
        };
    }]);
