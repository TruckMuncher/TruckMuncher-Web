interface IUserProfileCtrlScope {
    isVendor: boolean;
    submit(): void;
    user: IUser;
    requestInProgress: boolean;
    createTruck():void;
    unlinkAccounts(unlinkTwitter:boolean, unlinkFacebook:boolean): void;
}
angular.module('TruckMuncherApp').controller('userProfileCtrl', ['$scope', 'StateService', 'UserService', 'TruckService', 'growl',
    function ($scope:IUserProfileCtrlScope, StateService, UserService, TruckService, growl: IGrowlService) {
        $scope.isVendor = StateService.isVendor();
        $scope.requestInProgress = false;

        UserService.getAccount().then((response)=> {
            $scope.user = response;
        });

        $scope.submit = ()=> {
            $scope.requestInProgress = true;
            if ($scope.user) {
                UserService.modifyAccount($scope.user.postToFb, $scope.user.postToTw).then((response)=> {
                    $scope.user = response;
                    $scope.requestInProgress = false;
                    growl.addSuccessMessage('Settings saved');
                }, ()=> {
                    $scope.requestInProgress = false;
                });
            }
        };

        $scope.createTruck = () => {
            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(null, 'New Truck', null, null, null, null, null).then(()=> {
                $scope.isVendor = true;
                $scope.requestInProgress = false;
            }, ()=> {
                $scope.requestInProgress = false;
            });
        };

        $scope.unlinkAccounts = (unlinkTwitter, unlinkFacebook)=> {
            $scope.requestInProgress = true;
            UserService.unlinkAccounts(unlinkTwitter, unlinkFacebook).then(()=>{
                $scope.requestInProgress = false;
            },()=>{
                $scope.requestInProgress = false;
            });
        }
    }]);