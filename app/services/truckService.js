angular.module('TruckMuncherApp')
    .factory('TruckService', ['httpHelperService', '$q', function (httpHelperService, $q) {
        return {
            getTrucksForVendor: function () {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
                return httpHelperService.post(url, {}, 'trucks');
            },
            modifyTruckProfile: function (truckId, name, imageUrl, keywords) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
                return httpHelperService.post(url, {id: truckId, name: name, imageUrl: imageUrl, keywords: keywords});
            },
            getImageUploadUrl: function (truckId) {
                return httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
            },
            getActiveTrucks: function (latitude, longitude) {
                //var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
                //var data = {'latitude': latitude, 'longitude': longitude};
                //return httpHelperService.post(url, data, 'trucks');

                var deferred = $q.defer();
                deferred.resolve([
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea7", latitude: 43.05, longitude: -87.95},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea6", latitude: 43.046978, longitude: -87.904087},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea5", latitude: 43.044093, longitude: -87.902027},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea4", latitude: 43.045849, longitude: -87.899795}
                ]);
                return deferred.promise;
            },
            getTruckProfiles: function (latitude, longitude) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTruckProfiles';
                return httpHelperService.post(url, {'latitude': latitude, 'longitude': longitude}, 'trucks');
            }
        };
    }]);
