/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express'),
session = require('express-session'),
path = require('path'),
config = require('./oauth.js'),
passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
}
));

passport.use(new TwitterStrategy({
	consumerKey: config.twitter.consumerKey,
	consumerSecret: config.twitter.consumerSecret,
	callbackURL: config.twitter.callbackURL
},
function(accessToken, refreshToken, profile, done) {
	console.log(accessToken);
	process.nextTick(function () {
		return done(null, profile);
	});
}
));

// setup middleware
var app = express();

app.use(function(req, res, next) {
	console.log(req.session);
	next();
})


var sess = {
	secret: '1234567890QWERTY',
	resave: true, 
	saveUninitialized: true,
	cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(express.cookieParser());
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.errorHandler());
app.use(app.router);
app.use(express.static(__dirname + '/public')); //setup static public directory

app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


app.use(express.static(path.join(__dirname, '/lib')));

// // test authentication
// function ensureAuthenticated(req, res, next) {
// 	if (req.isAuthenticated()) { return next(); }
// 	res.redirect('/login')
// }


// render index page
app.get('/', function(req, res){
	res.render('index');
});

// Redirect the user to twitter for authentication.  When complete,
// Twitter will redirect the user back to the application at
//     /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	function(req, res, next) {
		res.redirect('/');
	});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res, next) {
		res.redirect('/');
	});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);


// Start server
app.listen(port, host);
console.log('App started on port ' + port);
