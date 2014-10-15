angular.module('TruckMuncherApp')
    .factory('FullMenus', ['$http', function($http){
        return {
            get: function(latitude, longitude, includeAvailability){
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getFullMenus',
                    data: {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability},
                    crossDomain: true,
                    cache: true
                }).then(function(response){
                    return response.data;
                }, function(error){
                    console.log(error);
                    return [];
                });
            }
        };
    }]);
