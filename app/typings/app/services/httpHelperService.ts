interface IHttpHelperService {
    getApiUrl(): string;
    post(url: string, data: {}, responseDataName ? : string): any;
    setApiUrl(url:string): void;
}