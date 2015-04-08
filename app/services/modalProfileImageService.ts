interface IModalProfileImageService {
    launch(imageUploadUrl:string): ng.IPromise<boolean>;
}

angular.module('TruckMuncherApp').factory('modalProfileImageService', ['$modal', '$q', ($modal, $q) => new ModalProfileImageService($modal, $q)]);

class ModalProfileImageService implements IModalProfileImageService {

    constructor(private $modal:ng.ui.bootstrap.IModalService, private $q:ng.IQService) {
    }

    launch(imageUploadUrl:string):ng.IPromise<boolean> {
        var deferred = this.$q.defer();
        var modalCtrl = ['$scope', 'imageUploadUrl', '$modalInstance', function ($scope, imageUploadUrl:string, $modalInstance:ng.ui.bootstrap.IModalServiceInstance) {
            $scope.imageUploadUrl = imageUploadUrl;

            $scope.onUploaded = function (cancelled) {
                if (cancelled)$modalInstance.dismiss();
                else $modalInstance.close();
            }
        }];

        var modalInstance = this.$modal.open({
            template: "" +
            "<div class='col-xs-12 bg-color-white container-fluid'>" +
            "  <div class='row'><i class='fa fa-close fa-2x pull-right pointer' data-ng-click='onUploaded(true)'></i></div>" +
            "  <div class='row form-group'><div data-profile-image-upload='' data-upload-url='imageUploadUrl' data-uploaded-callback='onUploaded(cancelled)'></div></div>" +
            "</div>",
            controller: modalCtrl,
            resolve: {
                imageUploadUrl: function () {
                    return imageUploadUrl;
                }
            },
            backdrop:'static'
        });

        modalInstance.result.then(function () {
            deferred.resolve(true)
        }, function () {
            deferred.resolve(false);
        });

        return deferred.promise;
    }
}
