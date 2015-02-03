declare module com.truckmuncher.api.exceptions {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		Error: ErrorBuilder;
		
	}
}

declare module com.truckmuncher.api.exceptions {

	export interface Error extends ProtoBufModel {
		internalCode: string;
		getInternalCode() : string;
		setInternalCode(internalCode : string): void;
		userMessage: string;
		getUserMessage() : string;
		setUserMessage(userMessage : string): void;
		
	}
	
	export interface ErrorBuilder {
		new(): Error;
		decode(buffer: ArrayBuffer) : Error;
		//decode(buffer: NodeBuffer) : Error;
		//decode(buffer: ByteArrayBuffer) : Error;
		decode64(buffer: string) : Error;
		
	}	
}

