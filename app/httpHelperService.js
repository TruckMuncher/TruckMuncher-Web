angular.module('TruckMuncherApp')
    .factory('httpHelperService', ['$http', '$q', 'growl', function ($http, $q, growl) {
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
                    growl.addErrorMessage('Error: ' + error.userMessage);
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    }]);