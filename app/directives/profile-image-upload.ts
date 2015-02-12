angular.module('TruckMuncherApp').directive('profileImageUpload', ['TruckService', 'growl', 'FileUploader', 'TimestampAndNonceService', 'TokenService', '$timeout', '$analytics',
    function (TruckService:ITruckService, growl:IGrowlService, FileUploader, TimestampAndNonceService, TokenService:ITokenService, $timeout:ng.ITimeoutService) {
        var link = {
            pre: function preLink(scope) {
                scope.imageLoading = false;

                var uploader = scope.uploader = new FileUploader({
                    url: scope.uploadUrl,
                    removeAfterUpload: true,
                    queueLimit: 1,
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

                /**
                 * Converts data uri to Blob. Necessary for uploading.
                 * @see http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
                 * @param  {String} dataURI
                 * @return {Blob}
                 */
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
                    scope.uploadedCallback({cancelled: true});
                };
                uploader.onCompleteAll = function () {
                    scope.uploadedCallback({cancelled: false});
                };
            }
        };

        return {
            restrict: 'A',
            link: link,
            scope: {uploadUrl: '=', uploadedCallback:'&'},
            replace: true,
            templateUrl: '/partials/directiveTemplates/profile-image-upload.jade'
        };
    }]);
