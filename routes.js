var api = require('./api');

function clearTokensFromSession(req) {
    req.session.sessionToken = null;
}

function logOutOfApi(req) {
    api.logout(req.session.sessionToken);
}

var routes = {
    index: function(req, res){
        res.render('index');
    },
    partials: function(req, res){
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