declare module com.truckmuncher.api.menu {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		MenuItemAvailabilityRequest: MenuItemAvailabilityRequestBuilder;
		MenuItemAvailabilityResponse: MenuItemAvailabilityResponseBuilder;
		FullMenusRequest: FullMenusRequestBuilder;
		FullMenusResponse: FullMenusResponseBuilder;
		MenuRequest: MenuRequestBuilder;
		MenuResponse: MenuResponseBuilder;
		ModifyMenuItemAvailabilityRequest: ModifyMenuItemAvailabilityRequestBuilder;
		ModifyMenuItemAvailabilityResponse: ModifyMenuItemAvailabilityResponseBuilder;
		Menu: MenuBuilder;
		Category: CategoryBuilder;
		MenuItem: MenuItemBuilder;
		MenuItemAvailability: MenuItemAvailabilityBuilder;
		
	}
}

declare module com.truckmuncher.api.menu {

	export interface MenuItemAvailabilityRequest extends ProtoBufModel {
		latitude: number;
		getLatitude() : number;
		setLatitude(latitude : number): void;
		longitude: number;
		getLongitude() : number;
		setLongitude(longitude : number): void;
		
	}
	
	export interface MenuItemAvailabilityRequestBuilder {
		new(): MenuItemAvailabilityRequest;
		decode(buffer: ArrayBuffer) : MenuItemAvailabilityRequest;
		//decode(buffer: NodeBuffer) : MenuItemAvailabilityRequest;
		//decode(buffer: ByteArrayBuffer) : MenuItemAvailabilityRequest;
		decode64(buffer: string) : MenuItemAvailabilityRequest;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface MenuItemAvailabilityResponse extends ProtoBufModel {
		availabilities: MenuItemAvailability[];
		getAvailabilities() : MenuItemAvailability[];
		setAvailabilities(availabilities : MenuItemAvailability[]): void;
		
	}
	
	export interface MenuItemAvailabilityResponseBuilder {
		new(): MenuItemAvailabilityResponse;
		decode(buffer: ArrayBuffer) : MenuItemAvailabilityResponse;
		//decode(buffer: NodeBuffer) : MenuItemAvailabilityResponse;
		//decode(buffer: ByteArrayBuffer) : MenuItemAvailabilityResponse;
		decode64(buffer: string) : MenuItemAvailabilityResponse;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface FullMenusRequest extends ProtoBufModel {
		latitude: number;
		getLatitude() : number;
		setLatitude(latitude : number): void;
		longitude: number;
		getLongitude() : number;
		setLongitude(longitude : number): void;
		includeAvailability?: boolean;
		getIncludeAvailability() : boolean;
		setIncludeAvailability(includeAvailability : boolean): void;
		
	}
	
	export interface FullMenusRequestBuilder {
		new(): FullMenusRequest;
		decode(buffer: ArrayBuffer) : FullMenusRequest;
		//decode(buffer: NodeBuffer) : FullMenusRequest;
		//decode(buffer: ByteArrayBuffer) : FullMenusRequest;
		decode64(buffer: string) : FullMenusRequest;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface FullMenusResponse extends ProtoBufModel {
		menus: Menu[];
		getMenus() : Menu[];
		setMenus(menus : Menu[]): void;
		
	}
	
	export interface FullMenusResponseBuilder {
		new(): FullMenusResponse;
		decode(buffer: ArrayBuffer) : FullMenusResponse;
		//decode(buffer: NodeBuffer) : FullMenusResponse;
		//decode(buffer: ByteArrayBuffer) : FullMenusResponse;
		decode64(buffer: string) : FullMenusResponse;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface MenuRequest extends ProtoBufModel {
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		
	}
	
	export interface MenuRequestBuilder {
		new(): MenuRequest;
		decode(buffer: ArrayBuffer) : MenuRequest;
		//decode(buffer: NodeBuffer) : MenuRequest;
		//decode(buffer: ByteArrayBuffer) : MenuRequest;
		decode64(buffer: string) : MenuRequest;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface MenuResponse extends ProtoBufModel {
		menu: Menu;
		getMenu() : Menu;
		setMenu(menu : Menu): void;
		
	}
	
	export interface MenuResponseBuilder {
		new(): MenuResponse;
		decode(buffer: ArrayBuffer) : MenuResponse;
		//decode(buffer: NodeBuffer) : MenuResponse;
		//decode(buffer: ByteArrayBuffer) : MenuResponse;
		decode64(buffer: string) : MenuResponse;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface ModifyMenuItemAvailabilityRequest extends ProtoBufModel {
		diff: MenuItemAvailability[];
		getDiff() : MenuItemAvailability[];
		setDiff(diff : MenuItemAvailability[]): void;
		
	}
	
	export interface ModifyMenuItemAvailabilityRequestBuilder {
		new(): ModifyMenuItemAvailabilityRequest;
		decode(buffer: ArrayBuffer) : ModifyMenuItemAvailabilityRequest;
		//decode(buffer: NodeBuffer) : ModifyMenuItemAvailabilityRequest;
		//decode(buffer: ByteArrayBuffer) : ModifyMenuItemAvailabilityRequest;
		decode64(buffer: string) : ModifyMenuItemAvailabilityRequest;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface ModifyMenuItemAvailabilityResponse extends ProtoBufModel {
		
	}
	
	export interface ModifyMenuItemAvailabilityResponseBuilder {
		new(): ModifyMenuItemAvailabilityResponse;
		decode(buffer: ArrayBuffer) : ModifyMenuItemAvailabilityResponse;
		//decode(buffer: NodeBuffer) : ModifyMenuItemAvailabilityResponse;
		//decode(buffer: ByteArrayBuffer) : ModifyMenuItemAvailabilityResponse;
		decode64(buffer: string) : ModifyMenuItemAvailabilityResponse;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface Menu extends ProtoBufModel {
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		categories: Category[];
		getCategories() : Category[];
		setCategories(categories : Category[]): void;
		
	}
	
	export interface MenuBuilder {
		new(): Menu;
		decode(buffer: ArrayBuffer) : Menu;
		//decode(buffer: NodeBuffer) : Menu;
		//decode(buffer: ByteArrayBuffer) : Menu;
		decode64(buffer: string) : Menu;
		
	}	
}

declare module com.truckmuncher.api.menu {

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
		menuItems: MenuItem[];
		getMenuItems() : MenuItem[];
		setMenuItems(menuItems : MenuItem[]): void;
		
	}
	
	export interface CategoryBuilder {
		new(): Category;
		decode(buffer: ArrayBuffer) : Category;
		//decode(buffer: NodeBuffer) : Category;
		//decode(buffer: ByteArrayBuffer) : Category;
		decode64(buffer: string) : Category;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface MenuItem extends ProtoBufModel {
		id?: string;
		getId() : string;
		setId(id : string): void;
		name: string;
		getName() : string;
		setName(name : string): void;
		price: number;
		getPrice() : number;
		setPrice(price : number): void;
		notes?: string;
		getNotes() : string;
		setNotes(notes : string): void;
		tags: string[];
		getTags() : string[];
		setTags(tags : string[]): void;
		orderInCategory?: number;
		getOrderInCategory() : number;
		setOrderInCategory(orderInCategory : number): void;
		isAvailable?: boolean;
		getIsAvailable() : boolean;
		setIsAvailable(isAvailable : boolean): void;
		
	}
	
	export interface MenuItemBuilder {
		new(): MenuItem;
		decode(buffer: ArrayBuffer) : MenuItem;
		//decode(buffer: NodeBuffer) : MenuItem;
		//decode(buffer: ByteArrayBuffer) : MenuItem;
		decode64(buffer: string) : MenuItem;
		
	}	
}

declare module com.truckmuncher.api.menu {

	export interface MenuItemAvailability extends ProtoBufModel {
		menuItemId: string;
		getMenuItemId() : string;
		setMenuItemId(menuItemId : string): void;
		isAvailable: boolean;
		getIsAvailable() : boolean;
		setIsAvailable(isAvailable : boolean): void;
		
	}
	
	export interface MenuItemAvailabilityBuilder {
		new(): MenuItemAvailability;
		decode(buffer: ArrayBuffer) : MenuItemAvailability;
		//decode(buffer: NodeBuffer) : MenuItemAvailability;
		//decode(buffer: ByteArrayBuffer) : MenuItemAvailability;
		decode64(buffer: string) : MenuItemAvailability;
		
	}	
}

