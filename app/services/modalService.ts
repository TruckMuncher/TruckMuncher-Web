interface IModalCtrlScope extends ng.IScope {
    menu: IMenu;
    customMenuColors: CustomMenuColors;
    close();
}

interface IModalService {
    menu(truckId:string, colors:CustomMenuColors): void;
    reportActiveTruck(coords);
}

angular.module('TruckMuncherApp').factory('ModalService',
    ['$modal', '$q', ($modal, $q) => new ModalService($modal, $q)]);

class ModalService implements IModalService {


    constructor(private $modal:ng.ui.bootstrap.IModalService, private $q:ng.IQService) {

    }

    menu(truckId:string, colors:CustomMenuColors):void {
        var modalCtrl = ['$scope', 'truckId', 'customMenuColors', '$modalInstance', 'MenuService',
            function ($scope:IModalCtrlScope, truckId:string, customMenuColors:CustomMenuColors, $modalInstance:ng.ui.bootstrap.IModalServiceInstance, MenuService:IMenuService) {
                $scope.menu = null;
                $scope.customMenuColors = customMenuColors;


                MenuService.getMenu(truckId).then(function (response) {
                    $scope.menu = response.menu;
                });

                $scope.close = function () {
                    $modalInstance.close({});
                };
            }];

        this.$modal.open({
            templateUrl: "/partials/map/menu-popup",
            controller: modalCtrl,
            resolve: {
                truckId: function () { return truckId; },
                customMenuColors: function () { return colors; }
            }
        });
    }

    reportActiveTruck(coords) {
        var deferred = this.$q.defer();
        var modal = this.$modal.open({
            templateUrl: '/partials/map/truckActiveReportTemplate.jade',
            controller: 'truckActiveReportCtrl',
            resolve: {
                coords: function () { return _.clone(coords); }
            },
            backdrop: 'static'
        });

        modal.result.then(()=> {
            deferred.resolve({});
        }, ()=> {
            deferred.resolve({});
        });

        return deferred.promise;
    }

}
