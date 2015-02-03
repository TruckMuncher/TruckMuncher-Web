declare module com.truckmuncher.api.search {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		SimpleSearchRequest: SimpleSearchRequestBuilder;
		SimpleSearchResponse: SimpleSearchResponseBuilder;
		SearchResponse: SearchResponseBuilder;
		
	}
}

declare module com.truckmuncher.api.search {

	export interface SimpleSearchRequest extends ProtoBufModel {
		query: string;
		getQuery() : string;
		setQuery(query : string): void;
		limit?: number;
		getLimit() : number;
		setLimit(limit : number): void;
		offset?: number;
		getOffset() : number;
		setOffset(offset : number): void;
		skipCorrection?: boolean;
		getSkipCorrection() : boolean;
		setSkipCorrection(skipCorrection : boolean): void;
		glutenFree?: boolean;
		getGlutenFree() : boolean;
		setGlutenFree(glutenFree : boolean): void;
		peanutFree?: boolean;
		getPeanutFree() : boolean;
		setPeanutFree(peanutFree : boolean): void;
		
	}
	
	export interface SimpleSearchRequestBuilder {
		new(): SimpleSearchRequest;
		decode(buffer: ArrayBuffer) : SimpleSearchRequest;
		//decode(buffer: NodeBuffer) : SimpleSearchRequest;
		//decode(buffer: ByteArrayBuffer) : SimpleSearchRequest;
		decode64(buffer: string) : SimpleSearchRequest;
		
	}	
}

declare module com.truckmuncher.api.search {

	export interface SimpleSearchResponse extends ProtoBufModel {
		searchResponse: SearchResponse[];
		getSearchResponse() : SearchResponse[];
		setSearchResponse(searchResponse : SearchResponse[]): void;
		correctedQuery: string;
		getCorrectedQuery() : string;
		setCorrectedQuery(correctedQuery : string): void;
		suggestions: string[];
		getSuggestions() : string[];
		setSuggestions(suggestions : string[]): void;
		
	}
	
	export interface SimpleSearchResponseBuilder {
		new(): SimpleSearchResponse;
		decode(buffer: ArrayBuffer) : SimpleSearchResponse;
		//decode(buffer: NodeBuffer) : SimpleSearchResponse;
		//decode(buffer: ByteArrayBuffer) : SimpleSearchResponse;
		decode64(buffer: string) : SimpleSearchResponse;
		
	}	
}

declare module com.truckmuncher.api.search {

	export interface SearchResponse extends ProtoBufModel {
		blurb: string;
		getBlurb() : string;
		setBlurb(blurb : string): void;
		truck: com.truckmuncher.api.trucks.Truck;
		getTruck() : com.truckmuncher.api.trucks.Truck;
		setTruck(truck : com.truckmuncher.api.trucks.Truck): void;
		menu: com.truckmuncher.api.menu.Menu;
		getMenu() : com.truckmuncher.api.menu.Menu;
		setMenu(menu : com.truckmuncher.api.menu.Menu): void;
		
	}
	
	export interface SearchResponseBuilder {
		new(): SearchResponse;
		decode(buffer: ArrayBuffer) : SearchResponse;
		//decode(buffer: NodeBuffer) : SearchResponse;
		//decode(buffer: ByteArrayBuffer) : SearchResponse;
		decode64(buffer: string) : SearchResponse;
		
	}	
}

