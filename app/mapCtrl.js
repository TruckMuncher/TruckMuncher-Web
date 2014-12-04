/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl',
    function ($scope) {
        $scope.map = {center: {latitude: 43.038, longitude: -87.906 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
    });