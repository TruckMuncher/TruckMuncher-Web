angular.module('vendorApp').controller('vendorMenuCtrl', ['$scope', 'FullMenus',
    function ($scope, FullMenus) {
        $scope.menu = null;

        FullMenus.get(15, 15, true).then(function (response) {

        });

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
        })
    }
]);