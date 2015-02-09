interface ISearchService {
    simpleSearch(query:string, limit:number, offset:number):ng.IPromise<ISearchResponse>;
}


angular.module('TruckMuncherApp').factory('SearchService', ['httpHelperService',
    (httpHelperService) => new SearchService(httpHelperService)]);

class SearchService implements ISearchService {
    httpHelperService:IHttpHelperService;

    constructor(httpHelperService:IHttpHelperService) {
        this.httpHelperService = httpHelperService;
    }

    simpleSearch(query:string, limit:number, offset:number):ng.IPromise<ISearchResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.search.SearchService/simpleSearch';
        return this.httpHelperService.post(url, {query: query, limit: limit, offset: offset});
    }

}

