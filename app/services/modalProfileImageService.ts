//interface IModalCtrlScope extends ng.IScope {
//    menu: IMenu;
//    customMenuColors: CustomMenuColors;
//    close();
//}

interface IModalProfileImageService {
    launch(imageUploadUrl:string): ng.IPromise<void>;
}

angular.module('TruckMuncherApp').factory('modalProfileImageService', ['$modal', '$q', ($modal, $q) => new ModalProfileImageService($modal, $q)]);

class ModalProfileImageService implements IModalProfileImageService {

    constructor(private $modal:ng.ui.bootstrap.IModalService, private $q:ng.IQService) {
    }

    launch(imageUploadUrl:string):ng.IPromise<void> {
        var deferred = this.$q.defer();
        var modalCtrl = [
            function () {
                //$scope.menu = null;
                //$scope.customMenuColors = customMenuColors;
                //
                //MenuService.getMenu(truckId).then(function (response) {
                //    $scope.menu = response.menu;
                //});
                //
                //$scope.close = function () {
                //    $modalInstance.close({});
                //};
            }];

        var modalInstance = this.$modal.open({
            template: "" +
            "<div class='col-xs-12 container-fluid'>" +
            "  <div class='row'><div data-profile-image-upload='' data-upload-url='imageUploadeUrl'></div></div>" +
            "</div>",
            controller: modalCtrl
        });

        modalInstance.result.then(function () {
            deferred.resolve()
        }, function () {
            deferred.resolve();
        });

        return deferred.promise;
    }
}
