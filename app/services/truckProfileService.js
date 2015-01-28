/* @flow */
angular.module('TruckMuncherApp').factory('TruckProfileService', ['TruckService', '$q', '$cookieStore',
    function (TruckService, $q, $cookieStore) {
        var millisecondsInADay = 86400000;

        function getTruckProfilesFromCookie() {
            return $cookieStore.get('truckProfiles');
        }

        return {
            updateTruckProfiles: function (latitude, longitude) {
                var deferred = $q.defer();
                TruckService.getTruckProfiles(latitude, longitude).then(function (response) {
                    $cookieStore.put('truckProfiles', response);
                    $cookieStore.put('truckProfilesLastUpdatedDate', "" + Date.now());
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            cookieNeedsUpdate: function () {
                var lastUpdated = $cookieStore.get('truckProfilesLastUpdatedDate');
                return _.isNull(lastUpdated) || _.isUndefined(lastUpdated) || _.isNaN(lastUpdated) || Date.now() - lastUpdated > millisecondsInADay;
            },
            allTrucksInStoredProfiles: function (trucks) {
                var storedTrucks = $cookieStore.get('truckProfiles');
                if (_.isNull(storedTrucks) || _.isUndefined(storedTrucks) || _.isNull(trucks) || _.isUndefined(trucks))
                    return false;

                for (var i = 0; i < trucks.length; i++) {
                    if (!_.some(storedTrucks, {'id': trucks[i].id}))
                        return false;
                }

                return true;
            },
            getTruckProfile: function (truckId) {
                var profiles = getTruckProfilesFromCookie();
                return _.find(profiles, function (x) {
                    return x.id === truckId;
                });
            }
        };

    }]);