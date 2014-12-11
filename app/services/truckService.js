angular.module('TruckMuncherApp')
    .factory('TruckService', ['httpHelperService', function (httpHelperService) {
        return {
            getTrucksForVendor: function () {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
                return httpHelperService.post(url, {}, 'trucks');
            },
            modifyTruckProfile: function (truckId, name, imageUrl, keywords, primaryColor, secondaryColor) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
                return httpHelperService.post(url,
                    {
                        id: truckId,
                        name: name,
                        imageUrl: imageUrl,
                        keywords: keywords,
                        primaryColor: primaryColor,
                        secondaryColor: secondaryColor
                    }
                );
            },
            getImageUploadUrl: function (truckId) {
                return httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
            }
        };
    }]);
