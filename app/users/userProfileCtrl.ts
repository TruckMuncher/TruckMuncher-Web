interface IUserProfileCtrlScope {
    isVendor: boolean;
    submit(): void;
    user: IUser;
    requestInProgress: boolean;
}
angular.module('TruckMuncherApp').controller('userProfileCtrl', ['$scope', 'StateService', 'UserService',
    function ($scope:IUserProfileCtrlScope, StateService, UserService) {
        $scope.isVendor = StateService.isVendor();
        $scope.requestInProgress = false;


        $scope.submit = ()=> {
            $scope.requestInProgress = true;
            if ($scope.user) {
                UserService.modifyAccount($scope.user.postToFb, $scope.user.postToTw).then((response)=> {
                    $scope.user = response;
                    $scope.requestInProgress = false;
                }, ()=> {
                    $scope.requestInProgress = false;
                });
            }
        }
    }]);