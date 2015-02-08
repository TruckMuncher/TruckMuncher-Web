interface IMenuService {
    getFullMenus(latitude:number, longitude:number, includeAvailability:boolean): ng.IPromise<IGetFullMenusResponse>;
    getMenu(truckId:string): ng.IPromise<IMenuResponse>;
    getItem(itemId:string): ng.IPromise<IGetMenuItemResponse>;
    getCategory(categoryId:string): ng.IPromise<IGetCategoryResponse>;
    addOrUpdateCategory(category:ICategory, truckId:string): ng.IPromise<IMenuResponse> ;
    addOrUpdateCategories(categories:Array < ICategory >, truckId:string): ng.IPromise<IMenuResponse> ;
    addOrUpdateItem(item:IMenuItem, truckId:string, categoryId:string): ng.IPromise<IMenuResponse> ;
    addOrUpdateItems(items:Array < IMenuItem >, truckId:string, categoryId:string): ng.IPromise<IMenuResponse> ;
    deleteCategory(truckId:string, categoryId:string): ng.IPromise<IMenuResponse> ;
    deleteItem(truckId:string, menuItemId:string): ng.IPromise<IMenuResponse> ;
    getTags(): ng.IPromise<ITagsResponse> ;
}

angular.module('TruckMuncherApp').factory('MenuService', ['httpHelperService',
    (httpHelperService) => new MenuService(httpHelperService)]);

class MenuService implements IMenuService {
    httpHelperService:IHttpHelperService;

    constructor(httpHelperService:IHttpHelperService) {
        this.httpHelperService = httpHelperService;
    }

    getFullMenus(latitude:number, longitude:number, includeAvailability:boolean):ng.IPromise<IGetFullMenusResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getFullMenus';
        var data = {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability};
        return this.httpHelperService.post(url, data);
    }

    getMenu(truckId:string):ng.IPromise<IMenuResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getMenu';
        var data = {'truckId': truckId};
        return this.httpHelperService.post(url, data);
    }

    getItem(itemId:string):ng.IPromise<IGetMenuItemResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem';
        var data = {'menuItemId': itemId};
        return this.httpHelperService.post(url, data);
    }

    getCategory(categoryId:string):ng.IPromise<IGetCategoryResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getCategory';
        var data = {'categoryId': categoryId};
        return this.httpHelperService.post(url, data);
    }

    addOrUpdateCategory(category:ICategory, truckId:string):ng.IPromise<IMenuResponse>  {
        return this.addOrUpdateCategories([category], truckId);
    }

    addOrUpdateCategories(categories:Array<ICategory>, truckId:string):ng.IPromise<IMenuResponse>  {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyCategory';
        var data = {'categories': categories, 'truckId': truckId};
        return this.httpHelperService.post(url, data);
    }

    addOrUpdateItem(item:IMenuItem, truckId:string, categoryId:string):ng.IPromise<IMenuResponse>  {
        return this.addOrUpdateItems([item], truckId, categoryId);
    }

    addOrUpdateItems(items:Array<IMenuItem>, truckId:string, categoryId:string):ng.IPromise<IMenuResponse>  {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem';
        var data = {'menuItems': items, 'truckId': truckId, 'categoryId': categoryId};
        return this.httpHelperService.post(url, data);
    }

    deleteCategory(truckId:string, categoryId:string):ng.IPromise<IMenuResponse>  {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteCategory';
        var data = {'truckId': truckId, 'categoryId': categoryId};
        return this.httpHelperService.post(url, data);
    }

    deleteItem(truckId:string, menuItemId:string):ng.IPromise<IMenuResponse>  {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteMenuItem';
        var data = {'truckId': truckId, 'menuItemId': menuItemId};
        return this.httpHelperService.post(url, data);
    }

    getTags():ng.IPromise<ITagsResponse>  {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getValidMenuItemTags';
        var data = {};
        return this.httpHelperService.post(url, data);
    }
}