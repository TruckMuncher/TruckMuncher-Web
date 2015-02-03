declare module com.truckmuncher.api.trucks {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		ActiveTrucksRequest: ActiveTrucksRequestBuilder;
		ActiveTrucksResponse: ActiveTrucksResponseBuilder;
		TrucksForVendorRequest: TrucksForVendorRequestBuilder;
		TrucksForVendorResponse: TrucksForVendorResponseBuilder;
		TruckProfilesRequest: TruckProfilesRequestBuilder;
		TruckProfilesResponse: TruckProfilesResponseBuilder;
		ModifyTruckRequest: ModifyTruckRequestBuilder;
		Truck: TruckBuilder;
		ServingModeRequest: ServingModeRequestBuilder;
		ServingModeResponse: ServingModeResponseBuilder;
		
	}
}

declare module com.truckmuncher.api.trucks {

	export interface ActiveTrucksRequest extends ProtoBufModel {
		latitude: number;
		getLatitude() : number;
		setLatitude(latitude : number): void;
		longitude: number;
		getLongitude() : number;
		setLongitude(longitude : number): void;
		searchQuery?: string;
		getSearchQuery() : string;
		setSearchQuery(searchQuery : string): void;
		
	}
	
	export interface ActiveTrucksRequestBuilder {
		new(): ActiveTrucksRequest;
		decode(buffer: ArrayBuffer) : ActiveTrucksRequest;
		//decode(buffer: NodeBuffer) : ActiveTrucksRequest;
		//decode(buffer: ByteArrayBuffer) : ActiveTrucksRequest;
		decode64(buffer: string) : ActiveTrucksRequest;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface ActiveTrucksResponse extends ProtoBufModel {
		trucks: ActiveTrucksResponse.Truck[];
		getTrucks() : ActiveTrucksResponse.Truck[];
		setTrucks(trucks : ActiveTrucksResponse.Truck[]): void;
		
	}
	
	export interface ActiveTrucksResponseBuilder {
		new(): ActiveTrucksResponse;
		decode(buffer: ArrayBuffer) : ActiveTrucksResponse;
		//decode(buffer: NodeBuffer) : ActiveTrucksResponse;
		//decode(buffer: ByteArrayBuffer) : ActiveTrucksResponse;
		decode64(buffer: string) : ActiveTrucksResponse;
		Truck: ActiveTrucksResponse.TruckBuilder;
		
	}	
}

declare module com.truckmuncher.api.trucks.ActiveTrucksResponse {

	export interface Truck extends ProtoBufModel {
		id: string;
		getId() : string;
		setId(id : string): void;
		latitude: number;
		getLatitude() : number;
		setLatitude(latitude : number): void;
		longitude: number;
		getLongitude() : number;
		setLongitude(longitude : number): void;
		
	}
	
	export interface TruckBuilder {
		new(): Truck;
		decode(buffer: ArrayBuffer) : Truck;
		//decode(buffer: NodeBuffer) : Truck;
		//decode(buffer: ByteArrayBuffer) : Truck;
		decode64(buffer: string) : Truck;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface TrucksForVendorRequest extends ProtoBufModel {
		
	}
	
	export interface TrucksForVendorRequestBuilder {
		new(): TrucksForVendorRequest;
		decode(buffer: ArrayBuffer) : TrucksForVendorRequest;
		//decode(buffer: NodeBuffer) : TrucksForVendorRequest;
		//decode(buffer: ByteArrayBuffer) : TrucksForVendorRequest;
		decode64(buffer: string) : TrucksForVendorRequest;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface TrucksForVendorResponse extends ProtoBufModel {
		trucks: Truck[];
		getTrucks() : Truck[];
		setTrucks(trucks : Truck[]): void;
		isNew: boolean;
		getIsNew() : boolean;
		setIsNew(isNew : boolean): void;
		
	}
	
	export interface TrucksForVendorResponseBuilder {
		new(): TrucksForVendorResponse;
		decode(buffer: ArrayBuffer) : TrucksForVendorResponse;
		//decode(buffer: NodeBuffer) : TrucksForVendorResponse;
		//decode(buffer: ByteArrayBuffer) : TrucksForVendorResponse;
		decode64(buffer: string) : TrucksForVendorResponse;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface TruckProfilesRequest extends ProtoBufModel {
		latitude: number;
		getLatitude() : number;
		setLatitude(latitude : number): void;
		longitude: number;
		getLongitude() : number;
		setLongitude(longitude : number): void;
		
	}
	
	export interface TruckProfilesRequestBuilder {
		new(): TruckProfilesRequest;
		decode(buffer: ArrayBuffer) : TruckProfilesRequest;
		//decode(buffer: NodeBuffer) : TruckProfilesRequest;
		//decode(buffer: ByteArrayBuffer) : TruckProfilesRequest;
		decode64(buffer: string) : TruckProfilesRequest;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface TruckProfilesResponse extends ProtoBufModel {
		trucks: Truck[];
		getTrucks() : Truck[];
		setTrucks(trucks : Truck[]): void;
		
	}
	
	export interface TruckProfilesResponseBuilder {
		new(): TruckProfilesResponse;
		decode(buffer: ArrayBuffer) : TruckProfilesResponse;
		//decode(buffer: NodeBuffer) : TruckProfilesResponse;
		//decode(buffer: ByteArrayBuffer) : TruckProfilesResponse;
		decode64(buffer: string) : TruckProfilesResponse;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface ModifyTruckRequest extends ProtoBufModel {
		id?: string;
		getId() : string;
		setId(id : string): void;
		name?: string;
		getName() : string;
		setName(name : string): void;
		keywords: string[];
		getKeywords() : string[];
		setKeywords(keywords : string[]): void;
		primaryColor?: string;
		getPrimaryColor() : string;
		setPrimaryColor(primaryColor : string): void;
		secondaryColor?: string;
		getSecondaryColor() : string;
		setSecondaryColor(secondaryColor : string): void;
		
	}
	
	export interface ModifyTruckRequestBuilder {
		new(): ModifyTruckRequest;
		decode(buffer: ArrayBuffer) : ModifyTruckRequest;
		//decode(buffer: NodeBuffer) : ModifyTruckRequest;
		//decode(buffer: ByteArrayBuffer) : ModifyTruckRequest;
		decode64(buffer: string) : ModifyTruckRequest;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface Truck extends ProtoBufModel {
		id?: string;
		getId() : string;
		setId(id : string): void;
		name?: string;
		getName() : string;
		setName(name : string): void;
		imageUrl?: string;
		getImageUrl() : string;
		setImageUrl(imageUrl : string): void;
		keywords: string[];
		getKeywords() : string[];
		setKeywords(keywords : string[]): void;
		primaryColor?: string;
		getPrimaryColor() : string;
		setPrimaryColor(primaryColor : string): void;
		secondaryColor?: string;
		getSecondaryColor() : string;
		setSecondaryColor(secondaryColor : string): void;
		
	}
	
	export interface TruckBuilder {
		new(): Truck;
		decode(buffer: ArrayBuffer) : Truck;
		//decode(buffer: NodeBuffer) : Truck;
		//decode(buffer: ByteArrayBuffer) : Truck;
		decode64(buffer: string) : Truck;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface ServingModeRequest extends ProtoBufModel {
		truckId: string;
		getTruckId() : string;
		setTruckId(truckId : string): void;
		isInServingMode: boolean;
		getIsInServingMode() : boolean;
		setIsInServingMode(isInServingMode : boolean): void;
		truckLatitude?: number;
		getTruckLatitude() : number;
		setTruckLatitude(truckLatitude : number): void;
		truckLongitude?: number;
		getTruckLongitude() : number;
		setTruckLongitude(truckLongitude : number): void;
		
	}
	
	export interface ServingModeRequestBuilder {
		new(): ServingModeRequest;
		decode(buffer: ArrayBuffer) : ServingModeRequest;
		//decode(buffer: NodeBuffer) : ServingModeRequest;
		//decode(buffer: ByteArrayBuffer) : ServingModeRequest;
		decode64(buffer: string) : ServingModeRequest;
		
	}	
}

declare module com.truckmuncher.api.trucks {

	export interface ServingModeResponse extends ProtoBufModel {
		
	}
	
	export interface ServingModeResponseBuilder {
		new(): ServingModeResponse;
		decode(buffer: ArrayBuffer) : ServingModeResponse;
		//decode(buffer: NodeBuffer) : ServingModeResponse;
		//decode(buffer: ByteArrayBuffer) : ServingModeResponse;
		decode64(buffer: string) : ServingModeResponse;
		
	}	
}

