angular.module('vendorApp').controller('itemDetailsCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        $scope.stateParams = $stateParams;

        //make a call to the service to get the information for the item
    }
]);