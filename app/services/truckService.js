/* @flow */


angular.module('TruckMuncherApp')
    .factory('TruckService', ['httpHelperService', function(httpHelperService) {
        var service: ITruckService = {
            getTrucksForVendor: function() {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
                return httpHelperService.post(url, {}, 'trucks');
            },
            modifyTruckProfile: function(truckId, name, keywords, primaryColor, secondaryColor) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
                return httpHelperService.post(url, {
                    id: truckId,
                    name: name,
                    keywords: keywords,
                    primaryColor: primaryColor,
                    secondaryColor: secondaryColor
                });
            },
            getImageUploadUrl: function(truckId) {
                return httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
            },
            getActiveTrucks: function(latitude, longitude) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
                var data = {
                    'latitude': latitude,
                    'longitude': longitude
                };
                return httpHelperService.post(url, data, 'trucks');
            },
            getTruckProfiles: function(latitude, longitude) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTruckProfiles';
                return httpHelperService.post(url, {
                    'latitude': latitude,
                    'longitude': longitude
                }, 'trucks');
            }
        };

        return service;
    }]);