interface IInitScope extends ng.IScope {
    initialize(sessionToken:string, apiUrl:string);
}

angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'StateService', 'httpHelperService', 'UserService', 'TruckService',
    ($scope, StateService, httpHelperService, UserService, TruckService) => new InitCtrl($scope, StateService, httpHelperService, UserService, TruckService)]);

class InitCtrl {
    constructor(private $scope:IInitScope, private StateService:IStateService, private httpHelperService:IHttpHelperService, private UserService:IUserService, private TruckService:ITruckService) {
        $scope.initialize = (sessionToken, apiUrl) => {
            httpHelperService.setApiUrl(apiUrl);

            if (sessionToken && sessionToken !== 'undefined' && sessionToken !== 'null') {
                StateService.setToken(sessionToken);

                var gotFavorites = false;
                var gotTrucks = false;
                UserService.getFavorites().then((response)=> {
                    StateService.setFavorites(response.favorites);
                    gotFavorites = true;
                    if (gotTrucks) StateService.setIsInitialized(true);
                }, ()=> {
                    gotFavorites = true;
                    if (gotTrucks) StateService.setIsInitialized(true);
                });

                TruckService.getTrucksForVendor().then((response)=> {
                    StateService.setTrucks(response.trucks);
                    gotTrucks = true;
                    if (gotFavorites) StateService.setIsInitialized(true);
                }, ()=> {
                    gotTrucks = true;
                    if (gotFavorites) StateService.setIsInitialized(true);
                });
            } else {
                StateService.setToken(null);
                StateService.setFavorites([]);
                StateService.setTrucks([]);
                StateService.setIsInitialized(true);
            }

        };
    }
}
