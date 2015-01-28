/* @flow */
angular.module('TruckMuncherApp').factory('TokenService', function () {
    var session_token = null;
    var service:ITokenService = {
        setToken: function (sessionToken) {
            session_token = sessionToken;
        },
        getToken: function () {
            return session_token;
        }
    };

    return service;
});