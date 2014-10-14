angular.module('TruckMuncherApp')
    .factory('TruckService', ['$http', function($http){
        return {
            getTrucksForVendor: function(){
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor',
                    data: {},
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