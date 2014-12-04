/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['uiGmapGoogleMapApi',
    function ($scope, GoogleMapApi) {
        GoogleMapApi.then(function(maps) {
            $scope.map = {center: {latitude: 43.038, longitude: -87.906 }, zoom: 14 };
            $scope.options = {scrollwheel: false};
        });

    }
]);