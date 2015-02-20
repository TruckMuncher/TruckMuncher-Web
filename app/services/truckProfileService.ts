interface ITruckProfileService {
    updateTruckProfiles(): ng.IPromise<Array<ITruckProfile>>;
    tryGetTruckProfile(truckId:string): ng.IPromise<ITruckProfile>;
    allTrucksFromCookie():Array<ITruckProfile>;
}

angular.module('TruckMuncherApp').factory('TruckProfileService', ['$q', '$cookieStore', 'httpHelperService',
    ($q, $cookieStore, httpHelperService) => new TruckProfileService($q, $cookieStore, httpHelperService)]);

class TruckProfileService implements ITruckProfileService {
    private millisecondsInADay:number = 86400000;
    private millisecondsInAMinute:number = 60000;
    private milwaukeeLatitude:number = 43.05;
    private milwaukeeLongitude:number = -87.95;

    constructor(private  $q:ng.IQService, private $cookieStore:ng.cookies.ICookieStoreService, private httpHelperService:IHttpHelperService) {
    }

    updateTruckProfiles() {
        var deferred = this.$q.defer();
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTruckProfiles';

        if (this.profilesUpdatedInLastMinute()) deferred.resolve(this.allTrucksFromCookie());
        else {
            this.httpHelperService.post(url, {
                'latitude': this.milwaukeeLatitude,
                'longitude': this.milwaukeeLongitude
            }).then((response:ITruckProfilesResponse)=> {
                this.$cookieStore.put('truckProfiles', response.trucks);
                this.$cookieStore.put('truckProfilesLastUpdatedDate', "" + Date.now());
                deferred.resolve(response.trucks);
            });
        }

        return deferred.promise;
    }

    private cookieNeedsUpdate():boolean {
        var lastUpdated = this.$cookieStore.get('truckProfilesLastUpdatedDate');
        return _.isNull(lastUpdated) || _.isUndefined(lastUpdated) || _.isNaN(lastUpdated) || Date.now() - lastUpdated > this.millisecondsInADay;
    }

    private getTruckProfileFromCookie(truckId:string):ITruckProfile {
        var profiles = this.allTrucksFromCookie();
        return _.find(profiles, function (x) {
            return x.id === truckId;
        });
    }

    tryGetTruckProfile(truckId) {
        var deferred = this.$q.defer();

        if (this.cookieNeedsUpdate()) this.updateTruckProfiles();

        var truck = this.getTruckProfileFromCookie(truckId);
        if (truck) deferred.resolve(truck);
        else {
            this.updateTruckProfiles().then((response:Array<ITruckProfile>) => {
                truck = _.find(response, function (t) {
                    return t.id === truckId;
                });

                if (truck) deferred.resolve(truck);
                else deferred.reject('not found');
            })
        }

        return deferred.promise;
    }

    private profilesUpdatedInLastMinute():boolean {
        var lastUpdated = this.$cookieStore.get('truckProfilesLastUpdatedDate');
        if(_.isNull(lastUpdated) || _.isUndefined(lastUpdated) || _.isNaN(lastUpdated) )return false
        else return Date.now() - lastUpdated < this.millisecondsInAMinute;
    }

    allTrucksFromCookie():Array<ITruckProfile> {
        return this.$cookieStore.get('truckProfiles');
    }
}
