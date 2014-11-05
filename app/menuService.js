angular.module('TruckMuncherApp')
    .factory('MenuService', ['httpHelperService', function (httpHelperService) {
        return {
            getFullMenus: function (latitude, longitude, includeAvailability) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getFullMenus';
                var data = {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability};
                return httpHelperService.post(url, data);
            },
            getMenu: function (truckId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menu.MenuService/getMenu';
                var data = {'truckId': truckId};
                return httpHelperService.post(url, data, 'menu');
            },
            getItem: function (itemId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem';
                var data = {'menuItemId': itemId};
                return httpHelperService.post(url, data, 'menuItem');
            },
            getCategory: function (categoryId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getCategory';
                var data = {'categoryId': categoryId};
                return httpHelperService.post(url, data, 'category');
            },
            addOrUpdateCategory: function (category, truckId) {
                return this.addOrUpdateCategories([category], truckId);
            },
            addOrUpdateCategories: function(categories, truckId){
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyCategory';
                var data = {'categories': categories, 'truckId': truckId};
                return httpHelperService.post(url, data, 'menu');
            },
            addOrUpdateItem: function (item, truckId, categoryId) {
                return this.addOrUpdateItems([item], truckId, categoryId);
            },
            addOrUpdateItems: function (items, truckId, categoryId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem';
                var data = {'menuItems': items, 'truckId': truckId, 'categoryId': categoryId};
                return httpHelperService.post(url, data, 'menu');
            },
            deleteCategory: function (truckId, categoryId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/deleteCategory';
                var data = {'truckId': truckId, 'categoryId': categoryId};
                return httpHelperService.post(url, data, 'menu');
            },
            deleteItem: function (truckId, menuItemId) {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/deleteMenuItem';
                var data = {'truckId': truckId, 'menuItemId': menuItemId};
                return httpHelperService.post(url, data, 'menu');
            },
            getTags: function () {
                var url = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.menuadmin.MenuAdminService/getValidMenuItemTags';
                var data = {};
                return httpHelperService.post(url, data, 'tags');
            }
        };
    }]);