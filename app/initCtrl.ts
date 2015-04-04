interface IInitScope extends ng.IScope {
    initializeToken(sessionToken:string);
    initializeApiUrl(url:string);
}

angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'StateService', 'httpHelperService', 'UserService', 'TruckService',
    ($scope, StateService, httpHelperService, UserService, TruckService) => new InitCtrl($scope, StateService, httpHelperService, UserService, TruckService)]);

class InitCtrl {
    constructor(private $scope:IInitScope, private StateService:IStateService, private httpHelperService:IHttpHelperService, private UserService:IUserService, private TruckService:ITruckService) {
        $scope.initializeToken = (sessionToken) => {
            if (sessionToken !== 'undefined' && sessionToken !== 'null') {
                StateService.setToken(sessionToken);
            } else {
                StateService.setToken(null);
            }

            UserService.getFavorites().then((response)=> {
                StateService.setFavorites(response.favorites);
            });

            TruckService.getTrucksForVendor().then((response)=> {
                StateService.setTrucks(response.trucks);
            });
        };

        $scope.initializeApiUrl = (url) => {
            httpHelperService.setApiUrl(url);
        };
    }
}
