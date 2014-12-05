/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl',
    function($scope) {
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    });
//    function ($scope, GoogleMapApi) {
//        GoogleMapApi.then(function(maps) {
//            $scope.map = {center: {latitude: 43.038, longitude: -87.906 }, zoom: 14 };
//            $scope.options = {scrollwheel: false};
//
//
//        });
//
//    }
