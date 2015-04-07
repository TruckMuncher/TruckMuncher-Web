interface ITruckDetailsScope extends ng.IScope {
    isOnline:boolean;
    selectedTruck:ITruckProfile;
    customMenuColors:CustomMenuColors;
    truckCoords:{latitude:number; longitude:number};
    map:{center:{}; zoom:number};
    mapHeight: string;
    menu:IMenu;
    options:any;
    isFavorite: boolean;
    loggedIn():boolean;
    addFavorite(truckId:string): void;
    removeFavorite(truckId:string):void;
}
angular.module('TruckMuncherApp').controller('truckDetailsCtrl', ['$scope', 'growl', '$stateParams', 'TruckProfileService', 'colorService', 'TruckService', 'MenuService', '$analytics', 'StateService', 'UserService',
    function ($scope:ITruckDetailsScope, growl:IGrowlService, $stateParams:ng.ui.IStateParamsService, TruckProfileService:ITruckProfileService, colorService:IColorService, TruckService:ITruckService, MenuService:IMenuService, $analytics:IAngularticsService, StateService:IStateService, UserService:IUserService) {
        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 15
        };
        $scope.mapHeight = screen.height / 4 + 'px';
        $scope.truckCoords = {latitude: 0, longitude: 0};
        $scope.options = {
            icon: {
                url: '/img/ic_map_marker.png',
                scaledSize: new google.maps.Size(21, 30)
            }
        };
        $scope.customMenuColors = null;
        $scope.selectedTruck = null;


        TruckProfileService.tryGetTruckProfile($stateParams['id']).then(function (truck) {
            $scope.selectedTruck = truck
        }, function () {
            growl.addErrorMessage("Could not find truck profile");
        });

        function determineIfTruckIsServing() {
            TruckService.getActiveTrucks().then(function (results) {
                var activeTruck = _.find(results.trucks, function (truck) {
                    return truck.id === $scope.selectedTruck.id;
                });

                if (activeTruck) {
                    $scope.isOnline = true;
                    $scope.truckCoords = {latitude: activeTruck.latitude, longitude: activeTruck.longitude};
                    $scope.map.center = _.clone($scope.truckCoords)
                }
            });
        }

        $scope.$watch('selectedTruck', function () {
            $scope.isOnline = false;

            if ($scope.selectedTruck) {
                MenuService.getMenu($scope.selectedTruck.id).then(function (response) {
                    $scope.menu = response.menu;
                });
                $scope.customMenuColors = colorService.getCustomMenuColorsForTruck($scope.selectedTruck);

                determineIfTruckIsServing();
                $scope.isFavorite = StateService.isFavorite($scope.selectedTruck.id);

                $analytics.eventTrack('truckDetails', {label: $scope.selectedTruck.name});
            }
        });

        $scope.loggedIn = ()=> {
            return StateService.getToken() !== null;
        };

        $scope.addFavorite = (truckId:string)=> {
            UserService.addFavorite(truckId).then(()=> {
                $scope.isFavorite = StateService.isFavorite($scope.selectedTruck.id);
            });
        };

        $scope.removeFavorite = (truckId:string)=> {
            UserService.removeFavorite(truckId).then(()=> {
                $scope.isFavorite = StateService.isFavorite($scope.selectedTruck.id);
            });
        };

    }]);
