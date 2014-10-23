angular.module('TruckMuncherApp').factory('confirmDialogService', ['$modal', function ($modal) {
    return{
        launch: function (size, title, body, acceptText, rejectText) {

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

            modalInstance.result.then(function () {
                return true;
            }, function () {
                return false;
            });
        }
    };
}]);