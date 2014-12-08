/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi',
    function ($scope, TruckService, uiGmapGoogleMapApi) {

        var lat;
        var lon;

        $scope.map = {
            center: {
                latitude: 43.05, longitude: -87.95 },
            zoom: 12
        };
        $scope.randomMarkers = [];

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

                    var temp = populateMarker(trucks[i]);

                    markers.push(temp);
                }

                $scope.randomMarkers = markers;

            });
        }

        function populateMarker(truck) {
            var newMarker = {
                id: truck.id,
                latitude: truck.latitude,
                longitude: truck.longitude,
                title: truck.id,
                show: false
            };

            newMarker.onClick = function() {
                console.log("Clicked");
                newMarker.show = !newMarker.show;
            };

            return newMarker;
        }

        $scope.windowOptions = {
            visible: true
        };

        $scope.closeClick = function() {
            console.log("closeClick");
            $scope.windowOptions.visible = false;
        };

        $scope.title = "Window Title!";

    }]);
