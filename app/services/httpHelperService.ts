interface IHttpHelperService {
    getApiUrl(): string;
    post<TResult>(url:string, data:{}): ng.IPromise<TResult>;
    setApiUrl(url:string): void;
}

angular.module('TruckMuncherApp').factory('httpHelperService', ['$http', '$q', 'growl', '$analytics',
    ($http, $q, growl, $analytics) => new HttpHelperService($http, $q, growl, $analytics)]);

class HttpHelperService implements IHttpHelperService {
    private apiUrl:string;
    $http:ng.IHttpService;
    $q:ng.IQService;
    growl:IGrowlService;
    $analytics:IAngularticsService;

    constructor($http:ng.IHttpService, $q:ng.IQService, growl:IGrowlService, $analytics:IAngularticsService) {
        this.$q = $q;
        this.growl = growl;
        this.$analytics = $analytics;
        this.apiUrl = 'https://api.truckmuncher.com:8443';
        this.$http = $http;
    }

    getApiUrl():string {
        return this.apiUrl;
    }

    post<TResult>(url:string, data:{}):ng.IPromise<TResult> {
        var deferred = this.$q.defer();
        this.$analytics.eventTrack('Request', {category: 'HttpHelperService', label: url});
        this.$http({
            method: 'POST',
            url: url,
            data: data,
            crossDomain: true
        }).then((response) => {
            deferred.resolve(response.data);
        }, (error:IApiError) => {
            if (error.data && error.data.userMessage) {
                this.growl.addErrorMessage('Error: ' + error.data.userMessage);
            } else {
                this.growl.addErrorMessage('An unknown error occurred');
            }
            deferred.reject(error);
        });
        return deferred.promise;
    }

    setApiUrl(url:string):void {
        this.apiUrl = url;
    }

}
