interface IMenuActionModalScope extends ng.IScope {
    openModal();
    modalInstance;
}

angular.module('TruckMuncherApp').controller('menuActionModalCtrl', ['$scope', '$stateParams', '$modal', '$state',
    ($scope, $stateParams, $modal, $state) =>  new MenuActionModalCtrl($scope, $stateParams, $modal, $state)]);

class MenuActionModalCtrl {
    constructor(private $scope:IMenuActionModalScope,
                private $stateParams:ng.ui.IStateParamsService,
                private $modal:ng.ui.bootstrap.IModalService,
                private $state:ng.ui.IStateService) {
        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: $state.current.data.templateUrl,
                controller: $state.current.data.controller
            });

            $scope.modalInstance.result.then(function (response) {
                $scope.$emit('menuUpdated', response);
                $state.go('menu');
            }, function (response) {
                if ($state.current.name !== 'menu' && response !== 'dismissFromStateChange') {
                    $state.go('menu');
                }
            });
        };

        $scope.openModal();
    }
}
