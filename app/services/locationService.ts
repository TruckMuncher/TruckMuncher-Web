interface ILocationService {
    getLocation():ng.IPromise<Position>;
}

angular.module('TruckMuncherApp').factory('LocationService', ['$q',
    ($q) => new LocationService($q)]);

class LocationService implements ILocationService {

    constructor(private $q:ng.IQService) {
    }

    getLocation() {
        var deferred = this.$q.defer();
        navigator.geolocation.getCurrentPosition(function (pos:Position) {
            deferred.resolve(pos);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise
    }
}
