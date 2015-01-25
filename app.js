/*jshint node:true*/

var host = (process.env.VCAP_APP_HOST || 'localhost');

var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    api = require('./server/api'),
    routes = require('./server/routes'),
    config = require('./server/oauth'),
    guid = require('./server/guid'),
    passport = require('passport'),
    favicon = require('serve-favicon'),
    q = require('q'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    servers = require('./server/serverConfig');


passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile, {accessToken: accessToken});
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
    },
    function (token, tokenSecret, profile, done) {
        process.nextTick(function () {
            return done(null, profile, {token: token, tokenSecret: tokenSecret});
        });
    }
));

// setup middleware
var app = express();

app.use(favicon(__dirname + '/public/img/favicon.ico'));

var sess = {
    genid: function (req) {
        return guid.gen(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'MunchyTruckMunch3r',
    resave: false,
    saveUninitialized: true,
    cookie: {}
};

//use secure cookies on non localhost
if (host !== 'localhost') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(express.cookieParser());
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.errorHandler());

app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    //res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private");
    //res.setHeader("Pragma", "no-cache");

    res.locals.sessionToken = req.session.sessionToken;
    res.locals.apiUrl = process.env.API_URL;

    //force https on everything but localhost
    var schema = req.protocol;
    if (schema === 'https' || host === 'localhost') {
        next();
    }
    else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use(app.router);
app.use(express.static(__dirname + '/public')); //setup static public directory

app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


app.use(express.static(path.join(__dirname, '/lib')));

app.get('/', routes.index);
app.get('/beta', routes.beta);

app.get('/partials/*', routes.partials);

app.get('*/logout', routes.logout);

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', function (req, res, next) {
    passport.authenticate('twitter', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/beta/');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            api.login(info.token, info.tokenSecret, null).then(function (response) {
                req.session.sessionToken = response.sessionToken;
                return res.redirect('/beta#/vendors/menu');
            }, function () {
                //TODO: handle error
                return next();
            });
        });
    })(req, res, next);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/beta/');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            api.login(null, null, info.accessToken).then(function (response) {
                req.session.sessionToken = response.sessionToken;
                return res.redirect('/beta#/vendors/menu');
            }, function () {
                //TODO: handle error
                return next;
            });
        });
    })(req, res, next);
});

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

servers.getHttpServer(app);
servers.getHttpsServer(app);
