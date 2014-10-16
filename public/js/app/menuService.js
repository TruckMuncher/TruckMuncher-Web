angular.module('TruckMuncherApp')
    .factory('MenuService', ['$http', function ($http) {
        return {
            getFullMenus: function (latitude, longitude, includeAvailability) {
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getFullMenus',
                    data: {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability},
                    crossDomain: true,
                    cache: true
                }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                    return [];
                });
            },
            getMenu: function (truckId) {
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getMenu',
                    data: {'truckId': truckId},
                    crossDomain: true
                }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                    return [];
                });
            },
            getItem: function (itemId) {
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem',
                    data: {'itemId': itemId},
                    crossDomain: true
                }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                    return [];
                });
            },
            getCategory: function(categoryId){
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getCategory',
                    data: {'categoryId': categoryId},
                    crossDomain: true
                }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                    return [];
                });
            },
            addOrUpdateCategory: function(truckId, id, name, notes, orderInMenu){
                return $http({
                    method: 'POST',
                    url: 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyCategory',
                    data: {'id': id, 'name': name, 'notes': notes, 'orderInMenu': orderInMenu},
                    crossDomain: true
                }).then(function (response) {
                    return response.data.menu;
                }, function (error) {
                    console.log(error);
                    return [];
                });
            }
        };
    }]);