
angular.module('TruckMuncherApp').factory('httpInterceptor', ['StateService', 'TimestampAndNonceService', '$location', '$q', 'growl',
    function (StateService: IStateService, TimestampAndNonceService: ITimestampAndNonceService, $location: ng.ILocationService, $q: ng.IQService) {
        return {
            request: function (config) {
                // oauth headers
                if (StateService.getToken()) {
                    config.headers.Authorization = 'session_token=' + StateService.getToken();
                }

                //nonce and timestamp headers
                config.headers['X-Timestamp'] = TimestampAndNonceService.getTimestamp();
                config.headers['X-Nonce'] = TimestampAndNonceService.getNonce();

                //configure cross domain
                delete config['X-Requested-With'];
                config.crossDomain = true;

                // json headers
                config.headers.Accept = 'application/json';
                config.headers['Content-Type'] = 'application/json';

                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    StateService.setToken(null);
                    StateService.setFavorites([]);
                    StateService.setTrucks([]);

                    if(StateService.getIsInitialized()){
                        $location.path('/login');
                    }
                }
                return $q.reject(rejection);
            }
        };
    }]);



