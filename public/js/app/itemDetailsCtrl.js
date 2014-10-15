angular.module('TruckMuncherApp').controller('itemDetailsCtrl', ['$scope', '$stateParams', '$modal', '$state',
    function ($scope, $stateParams, $modal, $state) {

        $scope.categories = {"item": "test1", "item2": "test2"};

        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'itemDetailsModalCtrl'
            });

            $scope.modalInstance.result.then(function (response) {

            }, function () {
                if($state.current.name !== 'menu'){
                    $state.go('menu');
                }
            });
        };

        $scope.openModal();
    }

]);


angular.module('TruckMuncherApp').controller('itemDetailsModalCtrl', ['$scope', '$modalInstance', '$state',
    function ($scope, $modalInstance, $state) {
        $scope.item = {};

        $scope.ok = function () {
            //do logic here
            console.log($scope.item)
        };

        $scope.$on('$stateChangeSuccess', function(){
            if($state.current.name === 'menu'){
                $modalInstance.dismiss();
            }
        });
    }]);