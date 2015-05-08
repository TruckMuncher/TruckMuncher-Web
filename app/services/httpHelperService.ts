interface IHttpHelperService {
    getApiUrl(): string;
    post<TResult>(url:string, data:{}): ng.IPromise<TResult>;
    setApiUrl(url:string): void;
}

angular.module('TruckMuncherApp').factory('httpHelperService', ['$http', '$q', 'growl', '$analytics', 'StateService',
    ($http, $q, growl, $analytics, StateService) => new HttpHelperService($http, $q, growl, $analytics, StateService)]);

class HttpHelperService implements IHttpHelperService {
    private apiUrl:string;

    constructor(private $http:ng.IHttpService, private $q:ng.IQService, private growl:IGrowlService, private $analytics:IAngularticsService, private StateService:IStateService) {
        this.apiUrl = 'https://api.truckmuncher.com:8443';
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
        }, (error) => {
            if (this.StateService.getIsInitialized() || error.status !== 401) {
                if (error.data && error.data.userMessage) {
                    this.growl.addErrorMessage('Error: ' + error.data.userMessage);
                } else {
                    this.growl.addErrorMessage('An unknown error occurred');
                }
            }
            deferred.reject(error);
        });
        return deferred.promise;
    }

    setApiUrl(url:string):void {
        this.apiUrl = url;
    }

}
