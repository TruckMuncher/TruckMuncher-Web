/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi', '$cookieStore', '$q', 'growl',
    function ($scope, TruckService, uiGmapGoogleMapApi, $cookieStore, $q, growl) {
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
            getTruckProfile(truck.id).then(function (truckProfileResponse) {
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

        function getTruckProfile(truckId) {
            var deferred = $q.defer();
            var profiles = getTruckProfilesFromCookie();
            var match = _.find(profiles, function (x) {
                return x.id === truckId;
            });

            if (_.isNull(match) || _.isUndefined(match)) {
                getTruckProfilesFromApi().then(function (response) {
                    var match = _.find(response, function (x) {
                        return x.id === truckId;
                    });
                    if (_.isNull(match) || _.isUndefined(match)) {
                        deferred.reject('Not Found');
                    } else {
                        deferred.resolve(match);
                    }
                });
            } else {
                deferred.resolve(match);
            }

            return deferred.promise;
        }

        function getTruckProfilesFromCookie() {
            return $cookieStore.get('truckProfiles');
        }

        function getTruckProfilesFromApi() {
            var deferred = $q.defer();
            TruckService.getTruckProfiles(lat, lon).then(function (response) {
                $cookieStore.put('truckProfiles', response);
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }]);
