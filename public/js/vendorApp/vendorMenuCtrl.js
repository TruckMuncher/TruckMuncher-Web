angular.module('vendorApp').controller('vendorMenuCtrl', ['$scope', 'FullMenus',
    function ($scope, FullMenus) {
        FullMenus.get(function(response){
            $scope.menus = response;
        })
    }
]);