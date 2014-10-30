var request = require('request');

var apiUrl = 'https://api.truckmuncher.com:8443/auth';

function makeRequest(url, method, header) {
    var options = {
        url: url,
        method: method,
        //TODO: DON'T DO THIS
        strictSSL: false,
        headers: header,
        body: {}

    };

    request(options, function(error){
        if(error){
            console.log('Error logging in: ' + error);
        }
    });
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
            makeRequest(apiUrl, 'GET', buildTwitterHeader(twitter_token, twitter_secret));
        }

        if (facebook_token) {
            makeRequest(apiUrl, 'GET', buildFacebookHeader(facebook_token));
        }
    },
    logout: function (twitter_token, twitter_secret, facebook_token) {
        if (twitter_token) {
            makeRequest(apiUrl, 'DELETE', buildTwitterHeader(twitter_token, twitter_secret));
        }

        if (facebook_token) {
            makeRequest(apiUrl, 'DELETE', buildFacebookHeader(facebook_token));
        }
    }
};

module.exports = api;