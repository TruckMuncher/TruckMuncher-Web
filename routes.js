var api = require('./api');

function clearTokensFromSession(req) {
    req.session.twitterToken = null;
    req.session.twitterTokenSecret = null;
    req.session.facebookAccessToken = null;
}

function logOutOfApi(req) {
    api.logout(req.session.twitterToken, req.session.twitterTokenSecret, null);
    api.logout(null, null, req.session.facebookAccessToken);
}

var routes = {
    index: function(req, res){
        res.render('index');
    },
    partials: function(req, res){
        res.locals.twitter_oauth_token = req.session.twitterToken;
        res.locals.twitter_oauth_token_secret = req.session.twitterTokenSecret;
        res.locals.facebook_access_token = req.session.facebookAccessToken;
        var partial = req.url.substring('/partials/'.length);
        res.render('partials/' + partial);
    },
    logout: function(req, res){
        logOutOfApi(req);
        clearTokensFromSession(req);
        req.logout();
        res.redirect('/#/login');
    }
};

module.exports = routes;