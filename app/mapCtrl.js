/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi', 'TruckProfileService', 'growl',
    function ($scope, TruckService, uiGmapGoogleMapApi, TruckProfileService, growl) {
        $scope.mapHeight = screen.height / 1.7 + 'px';
        var lat;
        var lon;

        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 12,
            clusterOptions: {
                "title": "Click to zoom",
                "gridSize": 60,
                "ignoreHidden": true,
                "minimumClusterSize": 2
            }
        };

        $scope.truckMarkers = [];
        $scope.truckWindows = [];

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

        function populateMarker(truck) {
            var truckProfile = TruckProfileService.getTruckProfile(truck.id, lat, lon);
            var marker = {
                id: truck.id,
                icon: 'img/SingleTruckAnnotationIcon.png',
                coords: {
                    latitude: truck.latitude,
                    longitude: truck.longitude
                },
                show: false
            };

            if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                marker.truckName = truckProfile.name;
                marker.truckKeywords = truckProfile.keywords;
            } else {
                marker.name = "Could not find profile for truck";
            }

            return marker;
        }

        $scope.showMarkerWindow = function (id) {
            _.forEach($scope.truckMarkers, function (m) {
                m.show = false;
            });
            var marker = _.find($scope.truckMarkers, function (marker) {
                return marker.id === id;
            });

            marker.show = true;
        }

    }]);