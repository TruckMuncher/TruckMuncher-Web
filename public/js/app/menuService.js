angular.module('TruckMuncherApp')
    .factory('MenuService', ['$http', function($http){
        return {
            getFullMenus: function(latitude, longitude, includeAvailability){
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
            },
            getMenu: function(truckId){
                return $http({
                    method: 'POST',
                    url:'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getFullMenus',
                    data: {'truckId': truckId},
                    crossDomain: true
                }).then(function(response){

                }, function(error){
                    console.log(error);
                    return [];
                });
            }
        };
    }]);