var routes = {
    index: function(req, res){
        res.render('index');
    },
    partials: function(req, res){
        var name = req.params.name;
        res.render('partials/' + name);
    },
    vendors: function(req, res){
        res.locals.twitter_oauth_token = req.session.twitterToken;
        res.locals.twitter_oauth_token_secret = req.session.twitterTokenSecret;
        res.locals.facebook_access_token = req.session.facebookAccessToken;
        res.render('vendorsOnly');
    },
    logout: function(req, res){
        req.logout();
        res.redirect('/');
    }
}

module.exports = routes;