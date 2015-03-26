var api = require('./api');

function clearTokensFromSession(req) {
    req.session.sessionToken = null;
}

function logout(req) {
    api.logout(req.session.sessionToken);
    clearTokensFromSession(req);
    req.logout();
}

var routes = {
    index: function (req, res) {
        res.render('index');
    },
    beta: function(req, res){
      res.render('beta');
    },
    partials: function (req, res) {
        var partial = req.url.substring('/partials/'.length);
        if (partial === 'login.jade' && req.session.sessionToken) {
            logout(req);
        }
        res.render('partials/' + partial);
    },
    logout: function (req, res) {
        logout(req);
        res.redirect('/beta/login');
    }
};

module.exports = routes;