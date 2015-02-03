interface IMarkerService {
    getMarkers(lat:number, lon:number):ng.IPromise<ITruckMarker>;
}

angular.module('TruckMuncherApp').factory('markerService', ['TruckService', 'TruckProfileService', '$q',
    (TruckService, TruckProfileService, $q) => new MarkerService(TruckService, TruckProfileService, $q)]);

class MarkerService implements IMarkerService {
    TruckService:ITruckService;
    TruckProfileService:ITruckProfileService;
    $q:ng.IQService;

    constructor(TruckService:ITruckService, TruckProfileService:ITruckProfileService, $q:ng.IQService) {
        this.TruckService = TruckService;
        this.TruckProfileService = TruckProfileService;
        this.$q = $q;
    }

    getMarkers(lat:number, lon:number):ng.IPromise<ITruckMarker> {
        var deferred = this.$q.defer();
        var markers = [];
        this.TruckService.getActiveTrucks(lat, lon).then((trucksResponse:Array<IActiveTruck>) => {
            if (this.TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !this.TruckProfileService.cookieNeedsUpdate()) {
                for (var i = 0; i < trucksResponse.length; i++) {
                    var marker = this.populateMarker(trucksResponse[i]);
                    markers.push(marker);
                }
            } else {
                this.TruckProfileService.updateTruckProfiles(lat, lon).then(() => {
                    for (var i = 0; i < trucksResponse.length; i++) {
                        var marker = this.populateMarker(trucksResponse[i]);
                        markers.push(marker);
                    }
                });
            }
            deferred.resolve(markers);
        });
        return deferred.promise;
    }

    private populateMarker(truck:IActiveTruck) {
        var truckProfile = this.TruckProfileService.getTruckProfile(truck.id);
        var marker = {
            id: truck.id,
            icon: 'img/SingleTruckAnnotationIcon.png',
            coords: {
                latitude: truck.latitude,
                longitude: truck.longitude
            },
            truckProfile: {}
        };

        if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
            marker.truckProfile = truckProfile;
        } else {
            marker.truckProfile = {name: "Could not find profile for truck"};
        }

        return marker;
    }
}
