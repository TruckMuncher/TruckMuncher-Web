interface IMenuService {
    getFullMenus(latitude:number, longitude:number, includeAvailability:boolean): any;
    getMenu(truckId:string): any;
    getItem(itemId:string): any;
    getCategory(categoryId:string): any;
    addOrUpdateCategory(category:ICategory, truckId:string): any;
    addOrUpdateCategories(categories:Array < ICategory >, truckId:string): any;
    addOrUpdateItem(item:IMenuItem, truckId:string, categoryId:string): any;
    addOrUpdateItems(items:Array < IMenuItem >, truckId:string, categoryId:string): any;
    deleteCategory(truckId:string, categoryId:string): any;
    deleteItem(truckId:string, menuItemId:string): any;
    getTags(): any;
}

angular.module('TruckMuncherApp').factory('MenuService', ['httpHelperService',
    (httpHelperService) => new MenuService(httpHelperService)]);

class MenuService implements IMenuService {
    httpHelperService:IHttpHelperService;

    constructor(httpHelperService:IHttpHelperService) {
        this.httpHelperService = httpHelperService;

    }

    getFullMenus(latitude:number, longitude:number, includeAvailability:boolean):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getFullMenus';
        var data = {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability};
        return this.httpHelperService.post(url, data);
    }

    getMenu(truckId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getMenu';
        var data = {'truckId': truckId};
        return this.httpHelperService.post(url, data, 'menu');
    }

    getItem(itemId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem';
        var data = {'menuItemId': itemId};
        return this.httpHelperService.post(url, data, 'menuItem');
    }

    getCategory(categoryId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getCategory';
        var data = {'categoryId': categoryId};
        return this.httpHelperService.post(url, data, 'category');
    }

    addOrUpdateCategory(category:ICategory, truckId:string):any {
        return this.addOrUpdateCategories([category], truckId);
    }

    addOrUpdateCategories(categories:Array<ICategory>, truckId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyCategory';
        var data = {'categories': categories, 'truckId': truckId};
        return this.httpHelperService.post(url, data, 'menu');
    }

    addOrUpdateItem(item:IMenuItem, truckId:string, categoryId:string):any {
        return this.addOrUpdateItems([item], truckId, categoryId);
    }

    addOrUpdateItems(items:Array<IMenuItem>, truckId:string, categoryId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem';
        var data = {'menuItems': items, 'truckId': truckId, 'categoryId': categoryId};
        return this.httpHelperService.post(url, data, 'menu');
    }

    deleteCategory(truckId:string, categoryId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteCategory';
        var data = {'truckId': truckId, 'categoryId': categoryId};
        return this.httpHelperService.post(url, data, 'menu');
    }

    deleteItem(truckId:string, menuItemId:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteMenuItem';
        var data = {'truckId': truckId, 'menuItemId': menuItemId};
        return this.httpHelperService.post(url, data, 'menu');
    }

    getTags():any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getValidMenuItemTags';
        var data = {};
        return this.httpHelperService.post(url, data, 'tags');
    }
}