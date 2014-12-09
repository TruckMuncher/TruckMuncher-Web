/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi', 'TruckProfileService', 'growl', '$q',
    function ($scope, TruckService, uiGmapGoogleMapApi, TruckProfileService, growl, $q) {
        var lat;
        var lon;

        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 12
        };

        $scope.randomMarkers = [];

        navigator.geolocation.getCurrentPosition(function (pos) {

            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            $scope.map.center = {latitude: lat, longitude: lon};

            getMarkers();

            $scope.$apply();
        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        function getMarkers() {
            TruckService.getActiveTrucks(lat, lon).then(function (trucksResponse) {
                $scope.randomMarkers = [];

                for (var i = 0; i < trucksResponse.length; i++) {
                    populateMarker(trucksResponse[i]).then(function (markerResponse) {
                        $scope.randomMarkers.push(markerResponse);
                    });
                }
            });
        }

        function populateMarker(truck) {
            var deferred = $q.defer();
            TruckProfileService.getTruckProfile(truck.id, lat, lon).then(function (truckProfileResponse) {
                var newMarker = {
                    id: truck.id,
                    latitude: truck.latitude,
                    longitude: truck.longitude,
                    show: false,
                    options: {
                        content: "<b>" + truckProfileResponse.name + "</b>" +
                        "<p>" + truckProfileResponse.keywords + "</p>",
                        maxWidth: 150
                    }
                };

                deferred.resolve(newMarker);
            });

            return deferred.promise;
        }
    }]);
