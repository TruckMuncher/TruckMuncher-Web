angular.module('TruckMuncherApp').factory('TruckProfileService', ['TruckService', '$q', '$cookieStore',
    function (TruckService, $q, $cookieStore) {

        return {
            getTruckProfile: function (truckId, latitude, longitude) {
                var deferred = $q.defer();
                var profiles = getTruckProfilesFromCookie();
                var match = _.find(profiles, function (x) {
                    return x.id === truckId;
                });

                if (_.isNull(match) || _.isUndefined(match)) {
                    getTruckProfilesFromApi(latitude, longitude).then(function (response) {
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
        };

        function getTruckProfilesFromCookie() {
            var lastUpdated = $cookieStore.get('truckProfilesLastUpdatedDate');
            //if last updated over 1 day ago, remove the both cookies and return nothing so that it gets updated

            return $cookieStore.get('truckProfiles');
        }

        function getTruckProfilesFromApi(latitude, longitude) {
            var deferred = $q.defer();
            TruckService.getTruckProfiles(latitude, longitude).then(function (response) {
                $cookieStore.put('truckProfiles', response);
                $cookieStore.put('truckProfilesLastUpdatedDate', Date.now());
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }]);