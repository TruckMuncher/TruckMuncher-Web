declare class IMenuService {
	getFullMenus(latitude: number, longitude: number, includeAvailability: boolean): any;
	getMenu(truckId: string): any;
	getItem(itemId: string): any;
	getCategory(categoryId: string): any;
	addOrUpdateCategory(category: Category, truckId: string): any;
	addOrUpdateCategories(categories: Array < Category > , truckId: string): any;
	addOrUpdateItem(item: MenuItem, truckId: string, categoryId: string): any;
	addOrUpdateItems(items: Array < MenuItem > , truckId: string, categoryId: string): any;
	deleteCategory(truckId: string, categoryId: string): any;
	deleteItem(truckId: string, menuItemId: string): any;
	getTags(): any;
}