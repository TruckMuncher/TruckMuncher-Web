var request = require('request'),
    q = require('q');

var apiUrl = 'https://api.truckmuncher.com:8443/com.truckmuncher.api.auth.AuthService/';

function makeRequest(url, method, header) {
    var options = {
        url: url,
        method: method,
        //TODO: DON'T DO THIS
        strictSSL: false,
        headers: header

    };

    var deferred = q.defer();
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(body);
        }
        if (error) {
            deferred.reject(error);
        }
    });

    return deferred.promise;
}

function buildTwitterHeader(twitter_token, twitter_secret) {
    return {
        'Authorization': 'oauth_token=' + twitter_token + ', oauth_secret=' + twitter_secret,
        'Accept': 'application/json'
    }
}

function buildFacebookHeader(facebook_token) {
    return {
        'Authorization': 'access_token=' + facebook_token,
        'Accept': 'application/json'
    }
}

var api = {
    login: function (twitter_token, twitter_secret, facebook_token) {
        if (twitter_token) {
            return makeRequest(apiUrl + 'getAuth', 'POST', buildTwitterHeader(twitter_token, twitter_secret));
        }

        if (facebook_token) {
            return makeRequest(apiUrl, 'POST', buildFacebookHeader(facebook_token));
        }
    },
    logout: function (sessionToken) {
        return makeRequest(apiUrl + 'deleteAuth', 'POST', {'session_token': sessionToken, 'Accept': 'application/json'});
    }
};

module.exports = api;