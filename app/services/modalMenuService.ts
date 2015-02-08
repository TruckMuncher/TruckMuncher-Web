interface IModalCtrlScope extends ng.IScope {
    menu: IMenu;
    customMenuColors: CustomMenuColors;
    close();
}

interface IModalMenuService {
    launch(truckId:string, colors:CustomMenuColors): void;
}

angular.module('TruckMuncherApp').factory('ModalMenuService', ['$modal', ($modal) => new ModalMenuService($modal)]);

class ModalMenuService implements IModalMenuService {
    $modal:ng.ui.bootstrap.IModalService;

    constructor($modal:ng.ui.bootstrap.IModalService) {
        this.$modal = $modal;
    }

    launch(truckId:string, colors:CustomMenuColors):void {
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
            templateUrl: "/partials/map/customer-menu.jade",
            controller: modalCtrl,
            resolve: {
                truckId: function () {
                    return truckId;
                },
                customMenuColors: function () {
                    return colors;
                }
            }
        });
    }
}
