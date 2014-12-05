/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'uiGmapGoogleMapApi',
    function ($scope, uiGmapGoogleMapApi) {
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        //uiGmapGoogleMapApi.then(function (maps) {
        //});
    }]);
