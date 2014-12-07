/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi',
    function ($scope, TruckService, uiGmapGoogleMapApi) {

        var lat;
        var lon;

        $scope.map = { center: { latitude: 43.05, longitude: -87.95 }, zoom: 12, markers: [] };

        navigator.geolocation.getCurrentPosition(function(pos) {

            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            var myLatLng = new google.maps.LatLng(lat, lon);

            $scope.map.center = { latitude: lat, longitude: lon};

            getMarkers();

            $scope.$apply();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });

        function getMarkers() {
            TruckService.getActiveTrucks(lat, lon).then(function (response) {

                trucks = response;

                var markers = [];

                for (var i = 0; i < trucks.length; i++) {
                    var newMarker = {
                        latitude: trucks[i].latitude,
                        longitude: trucks[i].longitude,
                        id: i,
//                        title: 'Test test',
                        options: {title: 'Test test'}
                    };

                    markers.push(newMarker);
                    console.log(newMarker);

                    $scope.map.markers = markers;

                }

            });
        }

    }]);
