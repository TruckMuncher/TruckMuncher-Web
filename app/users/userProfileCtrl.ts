interface IUserProfileCtrlScope {
    isVendor(): boolean;
    submit(): void;
    user: IUser;
    requestInProgress: boolean;
    createTruck():void;
    unlinkAccounts(unlinkTwitter:boolean, unlinkFacebook:boolean): void;
    favorites: Array<ITruckProfile>;
}
angular.module('TruckMuncherApp').controller('userProfileCtrl', ['$scope', 'StateService', 'UserService', 'TruckService', 'growl', 'TruckProfileService',
    function ($scope:IUserProfileCtrlScope, StateService, UserService, TruckService, growl:IGrowlService, TruckProfileService:ITruckProfileService) {
        $scope.requestInProgress = false;

        $scope.isVendor = ()=> {
            return StateService.isVendor();
        };

        UserService.getAccount().then((response)=> {
            $scope.user = response;
        });

        UserService.getFavorites().then((favoritesResponse)=> {
            TruckProfileService.updateTruckProfiles().then((profiles)=> {
                $scope.favorites = _.filter(profiles, (profile:ITruckProfile) => {
                    return _.contains(favoritesResponse.favorites, profile.id);
                });
            });
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
                $scope.requestInProgress = false;
            }, ()=> {
                $scope.requestInProgress = false;
            });
        };

        $scope.unlinkAccounts = (unlinkTwitter, unlinkFacebook)=> {
            $scope.requestInProgress = true;
            UserService.unlinkAccounts(unlinkTwitter, unlinkFacebook).then(()=> {
                $scope.requestInProgress = false;
            }, ()=> {
                $scope.requestInProgress = false;
            });
        }
    }]);