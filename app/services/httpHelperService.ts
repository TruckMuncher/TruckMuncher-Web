angular.module('TruckMuncherApp')
    .factory('httpHelperService', ['$http', '$q', 'growl', '$analytics',
        function ($http:ng.IHttpService, $q:ng.IQService, growl:IGrowlService, $analytics:IAngularticsService) {
            var apiUrl = 'https://api.truckmuncher.com:8443';
            return {
                post: function (url, data, responseDataName) {
                    var deferred = $q.defer();
                    $analytics.eventTrack('Request', {category: 'HttpHelperService', label: url});
                    $http({
                        method: 'POST',
                        url: url,
                        data: data,
                        crossDomain: true
                    }).then(function (response) {
                        if (responseDataName) deferred.resolve(response.data[responseDataName]);
                        else deferred.resolve(response.data);
                    }, function (error:IApiError) {
                        if (error.data && error.data.userMessage) {
                            growl.addErrorMessage('Error: ' + error.data.userMessage);
                        } else {
                            growl.addErrorMessage('An unknown error occurred');
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                setApiUrl: function (url) {
                    apiUrl = url;
                },
                getApiUrl: function () {
                    return apiUrl;
                }
            };
        }]);

class HttpHelperService implements IHttpHelperService {
    public static $inject = ['$http', '$q', 'growl', '$analytics'];
    private apiUrl:string;

    constructor(private $http:ng.IHttpService, $q:ng.IQService, growl:IGrowlService, $analytics:IAngularticsService) {
        this.apiUrl = 'https://api.truckmuncher.com:8443';
    }


    getApiUrl():string {
        return this.apiUrl;
    }

    post(url:string, data:{}, responseDataName:string):any {
        var deferred = $q.defer();
        $analytics.eventTrack('Request', {category: 'HttpHelperService', label: url});
        $http({
            method: 'POST',
            url: url,
            data: data,
            crossDomain: true
        }).then(function (response) {
            if (responseDataName) deferred.resolve(response.data[responseDataName]);
            else deferred.resolve(response.data);
        }, function (error:IApiError) {
            if (error.data && error.data.userMessage) {
                growl.addErrorMessage('Error: ' + error.data.userMessage);
            } else {
                growl.addErrorMessage('An unknown error occurred');
            }
            deferred.reject(error);
        });
        return deferred.promise;
    }

    setApiUrl(url:string):void {
        this.apiUrl = url;
    }

}
