var app = angular.module('truckmuncher.headerHelpers', []);

app.factory('TokenService', function () {
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
            }
        },
        getFacebook: function () {
            return {access_token: facebook_access_token};
        }
    }
});


app.factory('TimestampAndNonceService', function () {
    function twoDigitNumber(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    return{
        getTimestamp: function () {
            var d = new Date(new Date().getTime());
            var formattedTime =
                d.getUTCFullYear() + '-' +
                    twoDigitNumber(d.getUTCMonth()+1) + '-' +
                    twoDigitNumber(d.getUTCDate()) + 'T' +
                    twoDigitNumber(d.getUTCHours()) + ':' +
                    twoDigitNumber(d.getUTCMinutes()) + ':' +
                    twoDigitNumber(d.getUTCSeconds()) + 'Z';
            return formattedTime;
        },
        getNonce: function () {

        }
    }
});

app.factory('httpInterceptor', ['TokenService', function (TokenService) {
    return{
        request: function (config) {
            if (TokenService.getFacebook().access_token) {
                config.headers['Authorization'] = 'access_token=' + TokenService.getFacebook().access_token;
            } else {
                config.headers['Authorization'] =
                    'oauth_token=' + TokenService.getTwitter().oauth_token +
                    ', oauth_secret=' + TokenService.getTwitter().oauth_token_secret;
            }
            return config;
        }
    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    //configure cross domain ajax
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push('httpInterceptor');

    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

}]);