declare module com.truckmuncher.api.healthcheck {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		HealthResponse: HealthResponseBuilder;
		HealthRequest: HealthRequestBuilder;
		
	}
}

declare module com.truckmuncher.api.healthcheck {

	export interface HealthResponse extends ProtoBufModel {
		status: HealthResponse.Status;
		getStatus() : HealthResponse.Status;
		setStatus(status : HealthResponse.Status): void;
		revision?: string;
		getRevision() : string;
		setRevision(revision : string): void;
		nonce?: HealthResponse.Status;
		getNonce() : HealthResponse.Status;
		setNonce(nonce : HealthResponse.Status): void;
		timestamp?: HealthResponse.Status;
		getTimestamp() : HealthResponse.Status;
		setTimestamp(timestamp : HealthResponse.Status): void;
		checks: HealthResponse.Check[];
		getChecks() : HealthResponse.Check[];
		setChecks(checks : HealthResponse.Check[]): void;
		externalServicesStatus?: HealthResponse.Status;
		getExternalServicesStatus() : HealthResponse.Status;
		setExternalServicesStatus(externalServicesStatus : HealthResponse.Status): void;
		externalServices: HealthResponse.ExternalService[];
		getExternalServices() : HealthResponse.ExternalService[];
		setExternalServices(externalServices : HealthResponse.ExternalService[]): void;
		
	}
	
	export interface HealthResponseBuilder {
		new(): HealthResponse;
		decode(buffer: ArrayBuffer) : HealthResponse;
		//decode(buffer: NodeBuffer) : HealthResponse;
		//decode(buffer: ByteArrayBuffer) : HealthResponse;
		decode64(buffer: string) : HealthResponse;
		Check: HealthResponse.CheckBuilder;
		ExternalService: HealthResponse.ExternalServiceBuilder;
		Status: HealthResponse.Status;
		
	}	
}

declare module com.truckmuncher.api.healthcheck.HealthResponse {

	export interface Check extends ProtoBufModel {
		key: string;
		getKey() : string;
		setKey(key : string): void;
		value: Status;
		getValue() : Status;
		setValue(value : Status): void;
		
	}
	
	export interface CheckBuilder {
		new(): Check;
		decode(buffer: ArrayBuffer) : Check;
		//decode(buffer: NodeBuffer) : Check;
		//decode(buffer: ByteArrayBuffer) : Check;
		decode64(buffer: string) : Check;
		
	}	
}

declare module com.truckmuncher.api.healthcheck.HealthResponse {

	export interface ExternalService extends ProtoBufModel {
		key: string;
		getKey() : string;
		setKey(key : string): void;
		value?: string;
		getValue() : string;
		setValue(value : string): void;
		
	}
	
	export interface ExternalServiceBuilder {
		new(): ExternalService;
		decode(buffer: ArrayBuffer) : ExternalService;
		//decode(buffer: NodeBuffer) : ExternalService;
		//decode(buffer: ByteArrayBuffer) : ExternalService;
		decode64(buffer: string) : ExternalService;
		
	}	
}

declare module com.truckmuncher.api.healthcheck.HealthResponse {

	export enum Status {
		OK = 1,
		BAD = 2,
		
	}
}

declare module com.truckmuncher.api.healthcheck {

	export interface HealthRequest extends ProtoBufModel {
		
	}
	
	export interface HealthRequestBuilder {
		new(): HealthRequest;
		decode(buffer: ArrayBuffer) : HealthRequest;
		//decode(buffer: NodeBuffer) : HealthRequest;
		//decode(buffer: ByteArrayBuffer) : HealthRequest;
		decode64(buffer: string) : HealthRequest;
		
	}	
}

