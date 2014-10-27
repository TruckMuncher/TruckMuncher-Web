/** Requires base64.js from base-64 package*/
angular.module('TruckMuncherApp').factory('TokenService', function () {
    var twitter_oauth_token;
    var twitter_oauth_token_secret;
    var facebook_access_token;
    return {
        setTwitter: function (oauth_token, oauth_token_secret) {
            twitter_oauth_token = oauth_token;
            twitter_oauth_token_secret = oauth_token_secret;
        },
        setFacebook: function (access_token) {
            facebook_access_token = access_token;
        },
        getTwitter: function () {
            return {
                oauth_token: twitter_oauth_token,
                oauth_token_secret: twitter_oauth_token_secret
            };
        },
        getFacebook: function () {
            return {access_token: facebook_access_token};
        },
        hasTokens: function () {
            return twitter_oauth_token || twitter_oauth_token_secret || facebook_access_token;
        }
    };
});

app.factory('TimestampAndNonceService', function () {
    function twoDigitNumber(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    var guid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    return{
        getTimestamp: function () {
            var d = new Date(new Date().getTime());
            return d.getUTCFullYear() + '-' +
                twoDigitNumber(d.getUTCMonth() + 1) + '-' +
                twoDigitNumber(d.getUTCDate()) + 'T' +
                twoDigitNumber(d.getUTCHours()) + ':' +
                twoDigitNumber(d.getUTCMinutes()) + ':' +
                twoDigitNumber(d.getUTCSeconds()) + 'Z';
        },
        getNonce: function () {
            var uuid = guid();
            var _32randomChars = uuid.replace(/-/gi, '');
            return base64.encode(_32randomChars);
        }
    };
});


app.factory('httpInterceptor', ['TokenService', 'TimestampAndNonceService', '$location', '$q',
    function (TokenService, TimestampAndNonceService, $location, $q) {
        return{
            request: function (config) {
                // oauth headers
                if (TokenService.getFacebook().access_token) {
                    config.headers.Authorization = 'access_token=' + TokenService.getFacebook().access_token;
                } else if (TokenService.getTwitter().oauth_token) {
                    config.headers.Authorization =
                        'oauth_token=' + TokenService.getTwitter().oauth_token +
                        ', oauth_secret=' + TokenService.getTwitter().oauth_token_secret;
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
                if (rejection.status === 401) $location.path('/login');
                return $q.reject(rejection);
            }
        };
    }]);


