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