angular.module('TruckMuncherApp')
    .factory('httpHelperService', ['$http', '$q', 'growl', function ($http, $q, growl) {
        var apiUrl = 'https://api.truckmuncher.com:8443';
        return {
            post: function (url, data, responseDataName) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    crossDomain: true
                }).then(function (response) {
                    if (responseDataName) deferred.resolve(response.data[responseDataName]);
                    else deferred.resolve(response.data);
                }, function (error) {
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