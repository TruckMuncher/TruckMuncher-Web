angular.module('TruckMuncherApp').factory('confirmDialogService', ['$modal', function ($modal:ng.ui.bootstrap.IModalService) {
    return {
        launch: function (size:string, title:string, body:string, acceptText:string, rejectText:string) {

            var modalInstance = $modal.open({
                templateUrl: '/partials/shared/confirmDialog.jade',
                controller: 'confirmDialogCtrl',
                size: size,
                resolve: {
                    dialogInfo: function () {
                        return {
                            title: title,
                            body: body,
                            acceptText: acceptText,
                            rejectText: rejectText
                        };
                    }
                }
            });

            return modalInstance.result;
        }
    };
}]);