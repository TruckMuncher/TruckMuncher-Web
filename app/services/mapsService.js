/**
 * Created by maconsuckow on 12/7/14.
 */
angular.module('TruckMuncherApp')
    .factory('MapsService', ['httpHelperService', function (httpHelperService) {
        return {
            getAllLocations: function (latitude, longitude) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
                var data = {'latitude': latitude, 'longitude': longitude};
                return httpHelperService.post(url, data);
            }
        };
    }]);