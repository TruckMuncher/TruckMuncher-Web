angular.module('TruckMuncherApp')
    .factory('MarkerService', ['TruckService', 'TruckProfileService', '$q', function (TruckService, TruckProfileService, $q) {
        function populateMarker(truck, lat, lon) {
            var truckProfile = TruckProfileService.getTruckProfile(truck.id, lat, lon);
            var marker = {
                id: truck.id,
                icon: 'img/SingleTruckAnnotationIcon.png',
                coords: {
                    latitude: truck.latitude,
                    longitude: truck.longitude
                }
            };

            if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                marker.truckProfile = truckProfile;
            } else {
                marker.truckProfile = {name: "Could not find profile for truck"};
            }

            return marker;
        }

        return {
            getMarkers: function (lat, lon) {
                var deferred = $q.defer();
                var markers = [];
                TruckService.getActiveTrucks(lat, lon).then(function (trucksResponse) {
                    if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            markers.push(marker);
                        }
                    } else {
                        TruckProfileService.updateTruckProfiles(lat, lon).then(function () {
                            for (var i = 0; i < trucksResponse.length; i++) {
                                var marker = populateMarker(trucksResponse[i]);
                                markers.push(marker);
                            }
                        });
                    }
                    deferred.resolve(markers);
                });
                return deferred.promise;
            }
        };

    }]);