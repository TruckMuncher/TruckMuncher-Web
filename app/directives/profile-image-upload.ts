angular.module('TruckMuncherApp').directive('profileImageUpload', ['TruckService', 'growl', 'FileUploader', 'TimestampAndNonceService', 'TokenService',
    function (TruckService:ITruckService, growl:IGrowlService, FileUploader, TimestampAndNonceService, TokenService:ITokenService) {
        var link = {
            pre: function preLink(scope) {
                scope.imageLoading = false;

                var uploader = scope.uploader = new FileUploader({
                    url: scope.uploadUrl,
                    removeAfterUpload: true,
                    headers: {
                        Authorization: 'session_token=' + TokenService.getToken(),
                        Accept: 'application/json',
                        'X-Nonce': TimestampAndNonceService.getNonce(),
                        'X-Timestamp': TimestampAndNonceService.getTimestamp()
                    }
                });

                uploader.filters.push({
                    name: 'imageFilter',
                    fn: function (item) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });

                uploader.onAfterAddingFile = function (item) {
                    item.croppedImage = '';
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        scope.$apply(function () {
                            item.image = event.target.result;
                        });
                    };
                    reader.readAsDataURL(item._file);
                };

                scope.uploader.onProgressItem = function (item, progress) {
                    scope.progress = progress;
                };

                uploader.onBeforeUploadItem = function (item) {
                    item._file = dataURItoBlob(item.croppedImage);
                };

                var dataURItoBlob = function (dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };

                uploader.onCancelItem = function () {
                    scope.cancel();
                };

                uploader.onCompleteAll = function () {
                    uploader.clearQueue();
                    scope.uploadedCallback({cancelled: false});
                };

                scope.cancel = function () {
                    scope.uploadedCallback({cancelled: true});
                }
            }
        };

        return {
            restrict: 'A',
            link: link,
            scope: {uploadUrl: '=', uploadedCallback: '&'},
            replace: true,
            templateUrl: '/partials/directiveTemplates/profile-image-upload.jade'
        };
    }]);
