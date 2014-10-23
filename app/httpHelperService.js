angular.module('TruckMuncherApp')
    .factory('httpHelperService', ['$http', function ($http) {
        return {
            post: function (url, data, responseDataName) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    crossDomain: true
                }).then(function (response) {
                    if (responseDataName) return response.data[responseDataName];
                    else return response.data;
                }, function () {
                    return {hasError: true};
                });
            }
        };
    }]);