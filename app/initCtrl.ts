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

                UserService.getFavorites().then((response)=> {
                    StateService.setFavorites(response.favorites);
                });

                TruckService.getTrucksForVendor().then((response)=> {
                    StateService.setTrucks(response.trucks);
                });
            } else {
                StateService.setToken(null);
                StateService.setFavorites([]);
                StateService.setTrucks([]);
            }
        };
    }
}
