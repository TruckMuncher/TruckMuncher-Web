/* @flow */
angular.module('TruckMuncherApp')
    .factory('MarkerService', ['TruckService', 'TruckProfileService', '$q', function(TruckService: ITruckService, TruckProfileService: ITruckProfileService, $q) {
        function populateMarker(truck): ITruckMarker {
            var truckProfile: ITruckProfile = TruckProfileService.getTruckProfile(truck.id);
            var marker: ITruckMarker = {
                id: truck.id,
                icon: 'img/SingleTruckAnnotationIcon.png',
                coords: {
                    latitude: truck.latitude,
                    longitude: truck.longitude
                },
                truckProfile: truckProfile
            };

            if (_.isNull(truckProfile) && _.isUndefined(truckProfile)) {
                marker.truckProfile.name =  "Could not find profile for truck";
            }

            return marker;
        }

        var service: IMarkerService = {
            getMarkers: function(lat, lon) {
                var deferred = $q.defer();
                var markers: Array<ITruckMarker> = [];
                TruckService.getActiveTrucks(lat, lon).then(function(trucksResponse) {
                    if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            markers.push(marker);
                        }
                    } else {
                        TruckProfileService.updateTruckProfiles(lat, lon).then(function() {
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

        return service;

    }]);