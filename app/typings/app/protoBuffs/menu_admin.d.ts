declare module com.truckmuncher.api.menuadmin {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		MenuItemRequest: MenuItemRequestBuilder;
		MenuItemResponse: MenuItemResponseBuilder;
		ModifyMenuItemRequest: ModifyMenuItemRequestBuilder;
		ModifyMenuItemResponse: ModifyMenuItemResponseBuilder;
		DeleteMenuItemRequest: DeleteMenuItemRequestBuilder;
		DeleteMenuItemResponse: DeleteMenuItemResponseBuilder;
		CategoryRequest: CategoryRequestBuilder;
		CategoryResponse: CategoryResponseBuilder;
		ModifyCategoryRequest: ModifyCategoryRequestBuilder;
		ModifyCategoryResponse: ModifyCategoryResponseBuilder;
		DeleteCategoryRequest: DeleteCategoryRequestBuilder;
		DeleteCategoryResponse: DeleteCategoryResponseBuilder;
		MenuItemTagsRequest: MenuItemTagsRequestBuilder;
		MenuItemTagsResponse: MenuItemTagsResponseBuilder;
		
	}
}

declare module com.truckmuncher.api.menuadmin {

	export interface MenuItemRequest extends ProtoBufModel {
		menuItemId: string;
		getMenuItemId() : string;
		setMenuItemId(menuItemId : string): void;
		
	}
	
	export interface MenuItemRequestBuilder {
		new(): MenuItemRequest;
		decode(buffer: ArrayBuffer) : MenuItemRequest;
		//decode(buffer: NodeBuffer) : MenuItemRequest;
		//decode(buffer: ByteArrayBuffer) : MenuItemRequest;
		decode64(buffer: string) : MenuItemRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface MenuItemResponse extends ProtoBufModel {
		menuItem: com.truckmuncher.api.menu.MenuItem;
		getMenuItem() : com.truckmuncher.api.menu.MenuItem;
		setMenuItem(menuItem : com.truckmuncher.api.menu.MenuItem): void;
		
	}
	
	export interface MenuItemResponseBuilder {
		new(): MenuItemResponse;
		decode(buffer: ArrayBuffer) : MenuItemResponse;
		//decode(buffer: NodeBuffer) : MenuItemResponse;
		//decode(buffer: ByteArrayBuffer) : MenuItemResponse;
		decode64(buffer: string) : MenuItemResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface ModifyMenuItemRequest extends ProtoBufModel {
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		categoryId: string;
		getCategoryId() : string;
		setCategoryId(categoryId : string): void;
		menuItems: com.truckmuncher.api.menu.MenuItem[];
		getMenuItems() : com.truckmuncher.api.menu.MenuItem[];
		setMenuItems(menuItems : com.truckmuncher.api.menu.MenuItem[]): void;
		
	}
	
	export interface ModifyMenuItemRequestBuilder {
		new(): ModifyMenuItemRequest;
		decode(buffer: ArrayBuffer) : ModifyMenuItemRequest;
		//decode(buffer: NodeBuffer) : ModifyMenuItemRequest;
		//decode(buffer: ByteArrayBuffer) : ModifyMenuItemRequest;
		decode64(buffer: string) : ModifyMenuItemRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface ModifyMenuItemResponse extends ProtoBufModel {
		menu?: com.truckmuncher.api.menu.Menu;
		getMenu() : com.truckmuncher.api.menu.Menu;
		setMenu(menu : com.truckmuncher.api.menu.Menu): void;
		
	}
	
	export interface ModifyMenuItemResponseBuilder {
		new(): ModifyMenuItemResponse;
		decode(buffer: ArrayBuffer) : ModifyMenuItemResponse;
		//decode(buffer: NodeBuffer) : ModifyMenuItemResponse;
		//decode(buffer: ByteArrayBuffer) : ModifyMenuItemResponse;
		decode64(buffer: string) : ModifyMenuItemResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface DeleteMenuItemRequest extends ProtoBufModel {
		menuItemId: string;
		getMenuItemId() : string;
		setMenuItemId(menuItemId : string): void;
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		
	}
	
	export interface DeleteMenuItemRequestBuilder {
		new(): DeleteMenuItemRequest;
		decode(buffer: ArrayBuffer) : DeleteMenuItemRequest;
		//decode(buffer: NodeBuffer) : DeleteMenuItemRequest;
		//decode(buffer: ByteArrayBuffer) : DeleteMenuItemRequest;
		decode64(buffer: string) : DeleteMenuItemRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface DeleteMenuItemResponse extends ProtoBufModel {
		menu?: com.truckmuncher.api.menu.Menu;
		getMenu() : com.truckmuncher.api.menu.Menu;
		setMenu(menu : com.truckmuncher.api.menu.Menu): void;
		
	}
	
	export interface DeleteMenuItemResponseBuilder {
		new(): DeleteMenuItemResponse;
		decode(buffer: ArrayBuffer) : DeleteMenuItemResponse;
		//decode(buffer: NodeBuffer) : DeleteMenuItemResponse;
		//decode(buffer: ByteArrayBuffer) : DeleteMenuItemResponse;
		decode64(buffer: string) : DeleteMenuItemResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface CategoryRequest extends ProtoBufModel {
		categoryId: string;
		getCategoryId() : string;
		setCategoryId(categoryId : string): void;
		
	}
	
	export interface CategoryRequestBuilder {
		new(): CategoryRequest;
		decode(buffer: ArrayBuffer) : CategoryRequest;
		//decode(buffer: NodeBuffer) : CategoryRequest;
		//decode(buffer: ByteArrayBuffer) : CategoryRequest;
		decode64(buffer: string) : CategoryRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface CategoryResponse extends ProtoBufModel {
		category: com.truckmuncher.api.menu.Category;
		getCategory() : com.truckmuncher.api.menu.Category;
		setCategory(category : com.truckmuncher.api.menu.Category): void;
		
	}
	
	export interface CategoryResponseBuilder {
		new(): CategoryResponse;
		decode(buffer: ArrayBuffer) : CategoryResponse;
		//decode(buffer: NodeBuffer) : CategoryResponse;
		//decode(buffer: ByteArrayBuffer) : CategoryResponse;
		decode64(buffer: string) : CategoryResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface ModifyCategoryRequest extends ProtoBufModel {
		categories: ModifyCategoryRequest.Category[];
		getCategories() : ModifyCategoryRequest.Category[];
		setCategories(categories : ModifyCategoryRequest.Category[]): void;
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		
	}
	
	export interface ModifyCategoryRequestBuilder {
		new(): ModifyCategoryRequest;
		decode(buffer: ArrayBuffer) : ModifyCategoryRequest;
		//decode(buffer: NodeBuffer) : ModifyCategoryRequest;
		//decode(buffer: ByteArrayBuffer) : ModifyCategoryRequest;
		decode64(buffer: string) : ModifyCategoryRequest;
		Category: ModifyCategoryRequest.CategoryBuilder;
		
	}	
}

declare module com.truckmuncher.api.menuadmin.ModifyCategoryRequest {

	export interface Category extends ProtoBufModel {
		id?: string;
		getId() : string;
		setId(id : string): void;
		name?: string;
		getName() : string;
		setName(name : string): void;
		notes?: string;
		getNotes() : string;
		setNotes(notes : string): void;
		orderInMenu?: number;
		getOrderInMenu() : number;
		setOrderInMenu(orderInMenu : number): void;
		
	}
	
	export interface CategoryBuilder {
		new(): Category;
		decode(buffer: ArrayBuffer) : Category;
		//decode(buffer: NodeBuffer) : Category;
		//decode(buffer: ByteArrayBuffer) : Category;
		decode64(buffer: string) : Category;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface ModifyCategoryResponse extends ProtoBufModel {
		menu?: com.truckmuncher.api.menu.Menu;
		getMenu() : com.truckmuncher.api.menu.Menu;
		setMenu(menu : com.truckmuncher.api.menu.Menu): void;
		
	}
	
	export interface ModifyCategoryResponseBuilder {
		new(): ModifyCategoryResponse;
		decode(buffer: ArrayBuffer) : ModifyCategoryResponse;
		//decode(buffer: NodeBuffer) : ModifyCategoryResponse;
		//decode(buffer: ByteArrayBuffer) : ModifyCategoryResponse;
		decode64(buffer: string) : ModifyCategoryResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface DeleteCategoryRequest extends ProtoBufModel {
		categoryId: string;
		getCategoryId() : string;
		setCategoryId(categoryId : string): void;
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		
	}
	
	export interface DeleteCategoryRequestBuilder {
		new(): DeleteCategoryRequest;
		decode(buffer: ArrayBuffer) : DeleteCategoryRequest;
		//decode(buffer: NodeBuffer) : DeleteCategoryRequest;
		//decode(buffer: ByteArrayBuffer) : DeleteCategoryRequest;
		decode64(buffer: string) : DeleteCategoryRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface DeleteCategoryResponse extends ProtoBufModel {
		menu?: com.truckmuncher.api.menu.Menu;
		getMenu() : com.truckmuncher.api.menu.Menu;
		setMenu(menu : com.truckmuncher.api.menu.Menu): void;
		
	}
	
	export interface DeleteCategoryResponseBuilder {
		new(): DeleteCategoryResponse;
		decode(buffer: ArrayBuffer) : DeleteCategoryResponse;
		//decode(buffer: NodeBuffer) : DeleteCategoryResponse;
		//decode(buffer: ByteArrayBuffer) : DeleteCategoryResponse;
		decode64(buffer: string) : DeleteCategoryResponse;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface MenuItemTagsRequest extends ProtoBufModel {
		
	}
	
	export interface MenuItemTagsRequestBuilder {
		new(): MenuItemTagsRequest;
		decode(buffer: ArrayBuffer) : MenuItemTagsRequest;
		//decode(buffer: NodeBuffer) : MenuItemTagsRequest;
		//decode(buffer: ByteArrayBuffer) : MenuItemTagsRequest;
		decode64(buffer: string) : MenuItemTagsRequest;
		
	}	
}

declare module com.truckmuncher.api.menuadmin {

	export interface MenuItemTagsResponse extends ProtoBufModel {
		tags: string[];
		getTags() : string[];
		setTags(tags : string[]): void;
		
	}
	
	export interface MenuItemTagsResponseBuilder {
		new(): MenuItemTagsResponse;
		decode(buffer: ArrayBuffer) : MenuItemTagsResponse;
		//decode(buffer: NodeBuffer) : MenuItemTagsResponse;
		//decode(buffer: ByteArrayBuffer) : MenuItemTagsResponse;
		decode64(buffer: string) : MenuItemTagsResponse;
		
	}	
}

