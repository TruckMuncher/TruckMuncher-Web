angular.module('TruckMuncherApp')
    .factory('TruckService', ['httpHelperService', function (httpHelperService) {
        return {
            getTrucksForVendor: function () {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
                return httpHelperService.post(url, {}, 'trucks');
            },
            modifyTruckProfile: function (truckId, name, imageUrl, keywords) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
                return httpHelperService.post(url, {id: truckId, name: name, imageUrl: imageUrl, keywords: keywords});
            }
        };
    }]);
