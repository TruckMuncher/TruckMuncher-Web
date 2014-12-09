/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi',
    function ($scope, TruckService) {

        //Latitude and Longitude varaibles
        var lat;
        var lon;

        //Initialization of the map with a point to load first
        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 12
        };

        //Create markers array
        $scope.randomMarkers = [];

        //The navigator function that allows the gps coordinates to be gathered by the browser
        navigator.geolocation.getCurrentPosition(function(pos) {

            //Sets current latitude and longitude to the variables
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            //Resets the maps center
            $scope.map.center = { latitude: lat, longitude: lon};

            getMarkers();

            //Apply the changes to the scope parameter
            $scope.$apply();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });

        //Function that gets back the currently active trucks and creates google map markers from them
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

        //Function that receives a truck and strips the necessary information and returns a new marker
        //id: needed for the info windows
        //latitude: Latitude of the marker
        //longitude: Longitude of the marker
        //show: display of the info window when marker is created
        //options: Info window options. Contains content and a max-width
        function populateMarker(truck) {
            var newMarker = {
                id: truck.id,
                latitude: truck.latitude,
                longitude: truck.longitude,
                show: false,
                options: {
                    content: "<b>A Food Truck</b>" +
                        "<p>Chinese Cuisine</p>" +
                        "<p style='min-width: 150px'>Hours: 11am - 6pm</p>",
                    maxWidth: 150
                }
            };

            return newMarker;
        }
    }]);
