angular.module('TruckMuncherApp').controller('confirmDialogCtrl',['$scope', '$modalInstance', 'dialogInfo', function ($scope, $modalInstance, dialogInfo) {
    $scope.dialogInfo = dialogInfo;

    $scope.ok = function () {
        $modalInstance.close({});
    };

    $scope.cancel = function () {
        $modalInstance.dismiss({});
    };
}]);