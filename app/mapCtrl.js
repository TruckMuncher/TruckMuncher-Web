/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'TruckProfileService', 'growl',
    function ($scope, TruckService, TruckProfileService, growl) {
        $scope.mapHeight = screen.height / 1.7 + 'px';
        var lat, lon, infoWindow;

        var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(43.0500, -87.95)
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.truckMarkers = [];

        var mcOptions = {gridSize: 50, maxZoom: 15};
        var mc = new MarkerClusterer($scope.map, $scope.truckMarkers, mcOptions);

        navigator.geolocation.getCurrentPosition(function (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            $scope.map.panTo(new google.maps.LatLng(lat, lon));

            getMarkers();

            $scope.$apply();
        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        function getMarkers() {
            TruckService.getActiveTrucks(lat, lon).then(function (trucksResponse) {
                $scope.truckMarkers = [];
                if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                    for (var i = 0; i < trucksResponse.length; i++) {
                        var marker = populateMarker(trucksResponse[i]);
                        $scope.truckMarkers.push(marker);
                    }
                } else {
                    TruckProfileService.updateTruckProfiles(lat, lon).then(function () {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            $scope.truckMarkers.push(marker);
                        }
                    });
                }
            });
        }

        $scope.$watch('truckMarkers', function () {
            mc.clearMarkers();
            mc.addMarkers($scope.truckMarkers);
        });


        function populateMarker(truck) {
            var truckProfile = TruckProfileService.getTruckProfile(truck.id);
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(truck.latitude, truck.longitude),
                icon: 'img/SingleTruckAnnotationIcon.png'
            });
            var content = "Could not find truck profile";
            if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                content = "<b>" + truckProfile.name + "</b>" +
                "<p>" + truckProfile.keywords + "</p>";
            }
            addInfoWindowToMarker(marker, content);

            return marker;
        }

        function addInfoWindowToMarker(marker, content) {
            google.maps.event.addListener(marker, 'click', function () {
                if (!_.isUndefined(infoWindow)) {
                    infoWindow.close();
                }
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open($scope.map, marker);
            });
        }
    }])
;
