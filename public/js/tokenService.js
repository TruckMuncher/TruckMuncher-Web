var authModule = angular.module('truckmuncher.tokenService', []);

authModule.factory('TokenService', function () {
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